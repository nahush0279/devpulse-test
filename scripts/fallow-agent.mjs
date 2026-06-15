// scripts/fallow-agent.mjs
// AI review agent: Fallow (deterministic file+line facts) -> Groq (prose) ->
// GitHub Pull Request REVIEW with inline comments (CodeRabbit-style).
// Requires: GROQ_API_KEY, GITHUB_TOKEN, PR_NUMBER, REPO, HEAD_SHA env vars.
// Node 20+ (global fetch). No external dependencies.

import { readFileSync } from "node:fs";

const {
  GROQ_API_KEY,
  GITHUB_TOKEN,
  PR_NUMBER,
  REPO,
  BASE_REF = "main",
  HEAD_SHA = "",
  CONSOLE_FAIL,
  UNUSED_IMPORT_FAIL,
} = process.env;

const COMMENT_MARKER = "<!-- fallow-ai-agent -->";
const MODEL = "llama-3.3-70b-versatile";

// ---------------------------------------------------------------------------
// 1. Load fallow report
// ---------------------------------------------------------------------------
let report;
try {
  report = JSON.parse(readFileSync("fallow-report.json", "utf8"));
} catch (err) {
  console.error("Could not read fallow-report.json:", err.message);
  process.exit(0);
}

const dc = report.dead_code ?? {};
const dup = report.duplication ?? {};
const cx = report.complexity ?? {};
const verdict = report.verdict ?? "unknown";

// ---------------------------------------------------------------------------
// 2. Flatten every finding into a common shape
// ---------------------------------------------------------------------------
function firstAction(actions = []) {
  const a = actions.find((x) => x.auto_fixable) ?? actions[0];
  if (!a) return "";
  const auto = a.auto_fixable ? " (auto-fixable via `npx fallow fix`)" : "";
  return `${a.description}${auto}`;
}

const findings = [];

for (const f of dc.unused_files ?? []) {
  findings.push({
    category: "unused-file",
    label: "Unused file",
    path: f.path,
    line: null,
    blocking: true,
    introduced: f.introduced,
    detail: "This file is never imported anywhere.",
    fix: firstAction(f.actions),
    inline: false,
  });
}
for (const e of dc.unused_exports ?? []) {
  findings.push({
    category: "unused-export",
    label: "Unused export",
    path: e.path,
    line: e.line,
    blocking: true,
    introduced: e.introduced,
    detail: `Export \`${e.export_name}\` is never used outside this file.`,
    fix: firstAction(e.actions),
    inline: true,
  });
}
for (const t of dc.unused_types ?? []) {
  findings.push({
    category: "unused-type",
    label: "Unused type",
    path: t.path,
    line: t.line,
    blocking: true,
    introduced: t.introduced,
    detail: `Type \`${t.type_name ?? t.export_name ?? ""}\` is never referenced.`,
    fix: firstAction(t.actions),
    inline: t.line != null,
  });
}
for (const d of dc.unused_dependencies ?? []) {
  findings.push({
    category: "unused-dependency",
    label: "Unused dependency",
    path: d.path,
    line: d.line,
    blocking: true,
    introduced: d.introduced,
    detail: `\`${d.package_name}\` is listed in ${d.location} but never imported.`,
    fix: firstAction(d.actions),
    inline: true,
  });
}
for (const u of dc.unresolved_imports ?? []) {
  findings.push({
    category: "unresolved-import",
    label: "Unresolved import",
    path: u.path,
    line: u.line,
    blocking: true,
    introduced: u.introduced,
    detail: u.specifier
      ? `Cannot resolve \`${u.specifier}\`.`
      : "Unresolved import.",
    fix: firstAction(u.actions),
    inline: u.line != null,
  });
}
for (const u of dc.unlisted_dependencies ?? []) {
  findings.push({
    category: "unlisted-dependency",
    label: "Unlisted dependency",
    path: u.path,
    line: u.line,
    blocking: true,
    introduced: u.introduced,
    detail: u.package_name
      ? `\`${u.package_name}\` is imported but not in package.json.`
      : "Unlisted dependency.",
    fix: firstAction(u.actions),
    inline: u.line != null,
  });
}
for (const de of dc.duplicate_exports ?? []) {
  const loc = de.locations?.[0];
  const others = (de.locations ?? [])
    .slice(1)
    .map((l) => `\`${l.path}:${l.line}\``)
    .join(", ");
  findings.push({
    category: "duplicate-export",
    label: "Duplicate export",
    path: loc?.path,
    line: loc?.line,
    blocking: true,
    introduced: de.introduced,
    detail: `\`${de.export_name}\` is also exported from ${others || "another location"}.`,
    fix: firstAction(de.actions),
    inline: loc?.line != null,
  });
}
for (const c of dc.circular_dependencies ?? []) {
  const edge = c.edges?.[0] ?? {};
  const cyclePath = (c.files ?? []).map((f) => f.split("/").pop()).join(" -> ");
  findings.push({
    category: "circular-dependency",
    label: "Circular dependency",
    path: edge.path,
    line: edge.line,
    blocking: false,
    introduced: c.introduced,
    detail: `Import cycle: ${cyclePath}.`,
    fix: firstAction(c.actions),
    inline: edge.line != null,
  });
}
for (const g of dup.clone_groups ?? []) {
  const inst = g.instances?.[0] ?? {};
  const others = (g.instances ?? [])
    .slice(1)
    .map((i) => `\`${i.file}:${i.start_line}\``)
    .join(", ");
  findings.push({
    category: "code-duplication",
    label: "Code duplication",
    path: inst.file,
    line: inst.start_line,
    blocking: false,
    introduced: g.introduced,
    detail: `${g.line_count} duplicated lines, also at ${others || "another location"}. Consider extracting a shared function.`,
    fix: firstAction(g.actions),
    inline: inst.start_line != null,
  });
}
for (const f of cx.findings ?? []) {
  findings.push({
    category: "complexity",
    label: `Complexity (${f.severity})`,
    path: f.path,
    line: f.line,
    blocking: false,
    introduced: f.introduced,
    detail: `\`${f.name}\` has cyclomatic ${f.cyclomatic}, CRAP ${f.crap}.`,
    fix: firstAction(f.actions),
    inline: f.line != null,
  });
}

const introduced = findings.filter((f) => f.introduced);
const inlineFindings = introduced.filter((f) => f.inline && f.path && f.line);
const summaryOnly = introduced.filter((f) => !f.inline || !f.line);

// ---------------------------------------------------------------------------
// 3. Optionally enrich each inline finding with one short Groq sentence
// ---------------------------------------------------------------------------
async function groqEnrich(f) {
  if (!GROQ_API_KEY) return null;
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 120,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a terse senior code reviewer. Given one static-analysis finding, write ONE sentence (max 25 words) explaining the concrete risk or fix. No preamble, no markdown headers.",
          },
          {
            role: "user",
            content: `${f.label} in ${f.path}:${f.line}. ${f.detail} Suggested fix: ${f.fix}`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.choices?.[0]?.message?.content ?? "").trim() || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// 4. Build review payload
// ---------------------------------------------------------------------------
function emoji(blocking) {
  return blocking ? "⛔" : "💡";
}

async function buildReviewComments() {
  const comments = [];
  for (const f of inlineFindings) {
    const extra = await groqEnrich(f);
    const body =
      `${emoji(f.blocking)} **${f.label}** ${f.blocking ? "(blocking)" : "(advisory)"}\n\n` +
      `${f.detail}\n\n` +
      (extra ? `${extra}\n\n` : "") +
      (f.fix ? `**Fix:** ${f.fix}` : "");
    comments.push({ path: f.path, line: f.line, side: "RIGHT", body });
  }
  return comments;
}

function buildSummaryBody() {
  const blk = introduced.filter((f) => f.blocking).length;
  const adv = introduced.filter((f) => !f.blocking).length;
  let body = `${COMMENT_MARKER}\n### Fallow AI Review\n\n`;
  body += `**Verdict:** \`${verdict}\` - ${blk} blocking, ${adv} advisory finding(s) introduced by this PR.\n\n`;

  if (CONSOLE_FAIL === "true")
    body += `- BLOCKING: Console statements were added (see CI log).\n`;
  if (UNUSED_IMPORT_FAIL === "true")
    body += `- BLOCKING: File-local unused imports found (see ESLint output in CI log).\n`;

  if (summaryOnly.length) {
    body += `\n<details><summary>Findings without a line anchor (${summaryOnly.length})</summary>\n\n`;
    for (const f of summaryOnly) {
      body += `- ${emoji(f.blocking)} **${f.label}** - \`${f.path}\`${f.line ? ":" + f.line : ""} - ${f.detail} ${f.fix ? "_Fix: " + f.fix + "_" : ""}\n`;
    }
    body += `\n</details>\n`;
  }

  if (
    !introduced.length &&
    CONSOLE_FAIL !== "true" &&
    UNUSED_IMPORT_FAIL !== "true"
  ) {
    body += `No new issues introduced by this PR.\n`;
  }
  body += `\n<sub>Generated by the Fallow AI agent on \`${HEAD_SHA.slice(0, 7)}\`</sub>`;
  return body;
}

// ---------------------------------------------------------------------------
// 5. Post the review (dismiss previous agent reviews first)
// ---------------------------------------------------------------------------
const gh = (path, init = {}) =>
  fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
      ...init.headers,
    },
  });

async function dismissOldReviews() {
  const r = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/reviews`);
  if (!r.ok) return;
  const reviews = await r.json();
  for (const rev of reviews) {
    if (rev.body?.includes(COMMENT_MARKER) && rev.state !== "DISMISSED") {
      await gh(
        `/repos/${REPO}/pulls/${PR_NUMBER}/reviews/${rev.id}/dismissals`,
        {
          method: "PUT",
          body: JSON.stringify({
            message: "Superseded by newer Fallow review.",
            event: "DISMISS",
          }),
        },
      ).catch(() => {});
    }
  }
}

async function postReview() {
  const comments = await buildReviewComments();
  const bodyText = buildSummaryBody();

  const payload = {
    commit_id: HEAD_SHA,
    body: bodyText,
    event: "COMMENT", // never APPROVE/REQUEST_CHANGES; the gate step controls blocking
    comments,
  };

  let r = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (r.status === 422) {
    const errText = await r.text();
    console.error(
      "Inline review rejected (likely a line not in diff). Falling back to summary. Detail:",
      errText.slice(0, 300),
    );
    r = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/reviews`, {
      method: "POST",
      body: JSON.stringify({
        commit_id: HEAD_SHA,
        body: bodyText,
        event: "COMMENT",
      }),
    });
  }

  if (!r.ok)
    throw new Error(
      `Review POST failed: ${r.status} ${(await r.text()).slice(0, 300)}`,
    );
  console.log(`Posted review with ${comments.length} inline comment(s).`);
}

// ---------------------------------------------------------------------------
try {
  await dismissOldReviews();
  await postReview();
} catch (err) {
  console.error("Agent failed:", err.message);
  process.exit(0);
}
