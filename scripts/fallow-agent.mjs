// scripts/fallow-agent.mjs
// AI review agent: Fallow (deterministic file+line facts) -> Groq/DeepSeek (prose) ->
// GitHub Pull Request REVIEW with inline comments (CodeRabbit-style).
// Requires: GROQ_API_KEY or DEEPSEEK_API_KEY, GITHUB_TOKEN, PR_NUMBER, REPO, HEAD_SHA.
// Node 20+ (global fetch). No external dependencies.

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const {
  GROQ_API_KEY,
  DEEPSEEK_API_KEY,
  GITHUB_TOKEN,
  PR_NUMBER,
  REPO,
  BASE_REF = "main",
  HEAD_SHA = "",
  CONSOLE_FAIL,
  UNUSED_IMPORT_FAIL,
} = process.env;

const COMMENT_MARKER = "<!-- fallow-ai-agent -->";

// DeepSeek is primary; Groq is fallback when only GROQ_API_KEY is set.
const AI = DEEPSEEK_API_KEY
  ? {
      key: DEEPSEEK_API_KEY,
      url: "https://api.deepseek.com/chat/completions",
      model: "deepseek-chat",
    }
  : GROQ_API_KEY
    ? {
        key: GROQ_API_KEY,
        url: "https://api.groq.com/openai/v1/chat/completions",
        model: "llama-3.3-70b-versatile",
      }
    : null;

// Mechanical categories: skip AI enrichment (Fallow/ESLint text is enough).
const SKIP_GROQ = new Set([
  "unused-file",
  "unused-export",
  "unused-type",
  "unused-dependency",
  "unresolved-import",
  "unlisted-dependency",
  "unused-import",
  "console",
]);

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
function pickAction(actions = []) {
  const a = actions.find((x) => x.auto_fixable) ?? actions[0];
  if (!a) return { text: "", suggestion: null };
  const auto = a.auto_fixable ? " (auto-fixable via `npx fallow fix`)" : "";
  return { text: `${a.description}${auto}`, action: a };
}

function suggestionBlock(category, action) {
  if (!action?.auto_fixable) return null;
  if (category === "unused-export" && action.type === "remove-export") {
    return "```suggestion\n```";
  }
  if (category === "unused-dependency" && action.type === "remove-dependency") {
    return "```suggestion\n```";
  }
  return null;
}

const findings = [];
const dupExportPairs = new Set();
const pairKey = (paths) => [...paths].sort().join("|");

for (const f of dc.unused_files ?? []) {
  const { text } = pickAction(f.actions);
  findings.push({
    category: "unused-file",
    label: "Unused file",
    path: f.path,
    line: null,
    blocking: true,
    introduced: f.introduced,
    detail: "This file is never imported anywhere.",
    fix: text,
    suggestion: null,
    inline: false,
  });
}

for (const e of dc.unused_exports ?? []) {
  const { text, action } = pickAction(e.actions);
  findings.push({
    category: "unused-export",
    label: "Unused export",
    path: e.path,
    line: e.line,
    blocking: true,
    introduced: e.introduced,
    detail: `Export \`${e.export_name}\` is never used outside this file.`,
    fix: text,
    suggestion: suggestionBlock("unused-export", action),
    inline: e.line != null,
  });
}

for (const t of dc.unused_types ?? []) {
  const { text, action } = pickAction(t.actions);
  findings.push({
    category: "unused-type",
    label: "Unused type",
    path: t.path,
    line: t.line,
    blocking: true,
    introduced: t.introduced,
    detail: `Type \`${t.type_name ?? t.export_name ?? ""}\` is never referenced.`,
    fix: text,
    suggestion: suggestionBlock("unused-type", action),
    inline: t.line != null,
  });
}

for (const d of dc.unused_dependencies ?? []) {
  const { text, action } = pickAction(d.actions);
  findings.push({
    category: "unused-dependency",
    label: "Unused dependency",
    path: d.path,
    line: d.line,
    blocking: true,
    introduced: d.introduced,
    detail: `\`${d.package_name}\` is listed in ${d.location} but never imported.`,
    fix: text,
    suggestion: suggestionBlock("unused-dependency", action),
    inline: d.line != null,
  });
}

for (const u of dc.unresolved_imports ?? []) {
  const { text } = pickAction(u.actions);
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
    fix: text,
    suggestion: null,
    inline: u.line != null,
  });
}

for (const u of dc.unlisted_dependencies ?? []) {
  const { text } = pickAction(u.actions);
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
    fix: text,
    suggestion: null,
    inline: u.line != null,
  });
}

for (const de of dc.duplicate_exports ?? []) {
  const locations = de.locations ?? [];
  const { text } = pickAction(de.actions);
  if (locations.length)
    dupExportPairs.add(pairKey(locations.map((l) => l.path)));
  for (const loc of locations) {
    const others = locations
      .filter((l) => l.path !== loc.path || l.line !== loc.line)
      .map((l) => `\`${l.path}:${l.line}\``)
      .join(", ");
    findings.push({
      category: "duplicate-export",
      label: "Duplicate export",
      path: loc.path,
      line: loc.line,
      blocking: true,
      introduced: de.introduced,
      detail: `\`${de.export_name}\` is also exported from ${others || "another location"}.`,
      fix: text,
      suggestion: null,
      inline: loc.line != null,
    });
  }
}

for (const c of dc.circular_dependencies ?? []) {
  const edge = c.edges?.[0] ?? {};
  const cyclePath = (c.files ?? []).map((f) => f.split("/").pop()).join(" -> ");
  const { text } = pickAction(c.actions);
  findings.push({
    category: "circular-dependency",
    label: "Circular dependency",
    path: edge.path,
    line: edge.line,
    blocking: false,
    introduced: c.introduced,
    detail: `Import cycle: ${cyclePath}.`,
    fix: text,
    suggestion: null,
    inline: edge.line != null,
  });
}

for (const g of dup.clone_groups ?? []) {
  const files = (g.instances ?? []).map((i) => i.file);
  if (files.length && dupExportPairs.has(pairKey(files))) continue;
  const inst = g.instances?.[0] ?? {};
  const others = (g.instances ?? [])
    .slice(1)
    .map((i) => `\`${i.file}:${i.start_line}\``)
    .join(", ");
  const { text } = pickAction(g.actions);
  findings.push({
    category: "code-duplication",
    label: "Code duplication",
    path: inst.file,
    line: inst.start_line,
    blocking: false,
    introduced: g.introduced,
    detail: `${g.line_count} duplicated lines, also at ${others || "another location"}. Consider extracting a shared function.`,
    fix: text,
    suggestion: null,
    inline: inst.start_line != null,
  });
}

for (const f of cx.findings ?? []) {
  const { text } = pickAction(f.actions);
  findings.push({
    category: "complexity",
    label: `Complexity (${f.severity})`,
    path: f.path,
    line: f.line,
    blocking: false,
    introduced: f.introduced,
    detail: `\`${f.name}\` has cyclomatic ${f.cyclomatic}, CRAP ${f.crap}.`,
    fix: text,
    suggestion: null,
    inline: f.line != null,
  });
}

// Console statements from workflow console-hits.tsv (one inline comment per hit).
try {
  const tsv = readFileSync("console-hits.tsv", "utf8").trim();
  if (tsv) {
    for (const row of tsv.split("\n")) {
      const [path, lineStr] = row.split("\t");
      const line = parseInt(lineStr, 10);
      if (path && Number.isInteger(line)) {
        findings.push({
          category: "console",
          label: "Console statement",
          path,
          line,
          blocking: true,
          introduced: true,
          detail:
            "Console statements should not ship to production. Remove it or use the project logger.",
          fix: "Remove the console call, or add `// eslint-disable-next-line no-console` if intentional.",
          suggestion: "```suggestion\n```",
          inline: true,
        });
      }
    }
  }
} catch {
  /* no console hits file */
}

// ESLint unused imports/vars on changed files (eslint-report.json from workflow).
try {
  const cwd = process.cwd().replace(/\\/g, "/") + "/";
  for (const file of JSON.parse(readFileSync("eslint-report.json", "utf8"))) {
    const rel = file.filePath.replace(/\\/g, "/");
    const path = rel.startsWith(cwd) ? rel.slice(cwd.length) : rel;
    for (const m of file.messages ?? []) {
      if (m.severity < 2) continue;
      findings.push({
        category: "unused-import",
        label: "Unused import/variable",
        path,
        line: m.line ?? null,
        blocking: true,
        introduced: true,
        detail: m.message,
        fix: "Remove the unused import or binding.",
        suggestion: null,
        inline: m.line != null,
      });
    }
  }
} catch {
  /* no eslint report */
}

// Lines that appear as additions in the PR diff — GitHub only anchors inline
// review comments on lines visible in the diff. If ANY batched comment misses,
// the whole review POST returns 422 and we used to lose every inline comment.
function loadDiffAnchors() {
  const base = `origin/${BASE_REF}`;
  try {
    execSync(`git fetch origin ${BASE_REF} 2>/dev/null || true`, {
      stdio: "ignore",
    });
    const diff = execSync(
      `git diff ${base} HEAD --unified=0 -- "*.js" "*.jsx" "*.ts" "*.tsx"`,
      { encoding: "utf8" },
    );
    const anchors = new Set();
    let file = null;
    let line = null;
    for (const row of diff.split("\n")) {
      if (row.startsWith("+++ b/")) {
        file = row.slice(6);
        line = null;
      } else if (row.startsWith("@@")) {
        const m = row.match(/\+(\d+)/);
        line = m ? parseInt(m[1], 10) : null;
      } else if (row.startsWith("+") && !row.startsWith("+++")) {
        if (file && line != null) anchors.add(`${file}:${line}`);
        if (line != null) line++;
      }
    }
    return anchors;
  } catch (err) {
    console.error("Could not build diff anchors:", err.message);
    return null;
  }
}

const diffAnchors = loadDiffAnchors();

const introduced = findings.filter((f) => f.introduced);
const inlineCandidates = introduced.filter((f) => f.inline && f.path && f.line);
const inlineFindings = inlineCandidates.filter((f) => {
  if (!diffAnchors) return true;
  const key = `${f.path}:${f.line}`;
  if (diffAnchors.has(key)) return true;
  // Keep in summary instead of sending a comment GitHub will reject.
  f._diffAnchorMiss = true;
  return false;
});
const summaryOnly = introduced.filter(
  (f) => !f.inline || !f.line || f._diffAnchorMiss,
);

// ---------------------------------------------------------------------------
// 3. AI enrichment (judgment categories only)
// ---------------------------------------------------------------------------
async function groqEnrich(f) {
  if (!AI || SKIP_GROQ.has(f.category)) return null;
  try {
    const res = await fetch(AI.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${AI.key}`,
      },
      body: JSON.stringify({
        model: AI.model,
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
    if (!res.ok) {
      console.error(
        `AI enrichment failed: ${res.status} ${(await res.text()).slice(0, 200)}`,
      );
      return null;
    }
    const data = await res.json();
    return (data.choices?.[0]?.message?.content ?? "").trim() || null;
  } catch (err) {
    console.error(`AI enrichment error: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 4. Build review payload
// ---------------------------------------------------------------------------
function emoji(blocking) {
  return blocking ? "⛔" : "💡";
}

function categorySummary() {
  const counts = {};
  for (const f of introduced) {
    const k = `${f.label}__${f.blocking}`;
    counts[k] = counts[k] || { label: f.label, blocking: f.blocking, n: 0 };
    counts[k].n++;
  }
  const rows = Object.values(counts).sort(
    (a, b) => b.blocking - a.blocking || b.n - a.n,
  );
  if (!rows.length) return "";
  let t = `| | Category | Count |\n|---|---|---|\n`;
  for (const r of rows)
    t += `| ${emoji(r.blocking)} | ${r.label} ${r.blocking ? "(blocking)" : "(advisory)"} | ${r.n} |\n`;
  return t;
}

async function buildReviewComments() {
  const comments = [];
  for (const f of inlineFindings) {
    const extra = await groqEnrich(f);
    let body =
      `${emoji(f.blocking)} **${f.label}** ${f.blocking ? "(blocking)" : "(advisory)"}\n\n` +
      `${f.detail}\n\n` +
      (extra ? `${extra}\n\n` : "") +
      (f.fix ? `**Fix:** ${f.fix}` : "");
    if (f.suggestion) body += `\n\n${f.suggestion}`;
    comments.push({ path: f.path, line: f.line, side: "RIGHT", body });
  }
  return comments;
}

function buildSummaryBody() {
  const blk = introduced.filter((f) => f.blocking).length;
  const adv = introduced.filter((f) => !f.blocking).length;
  let body = `${COMMENT_MARKER}\n### Fallow AI Review\n\n`;
  body += `**Verdict:** \`${verdict}\` - ${blk} blocking, ${adv} advisory finding(s) introduced by this PR.\n\n`;

  const summary = categorySummary();
  if (summary) body += summary + "\n";

  if (
    CONSOLE_FAIL === "true" &&
    !introduced.some((f) => f.category === "console")
  ) {
    body += `- ⛔ **Console statements** were added (see CI log).\n`;
  }
  if (
    UNUSED_IMPORT_FAIL === "true" &&
    !introduced.some((f) => f.category === "unused-import")
  ) {
    body += `- ⛔ **Unused imports/variables** on changed files (see ESLint output in CI log).\n`;
  }

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
// 5. Post the review
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

async function postInlineComment(comment) {
  const r = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/comments`, {
    method: "POST",
    body: JSON.stringify({
      commit_id: HEAD_SHA,
      path: comment.path,
      line: comment.line,
      side: "RIGHT",
      body: comment.body,
    }),
  });
  if (!r.ok) {
    console.error(
      `Inline comment skipped for ${comment.path}:${comment.line}: ${r.status} ${(await r.text()).slice(0, 200)}`,
    );
    return false;
  }
  return true;
}

async function postReview() {
  const comments = await buildReviewComments();
  const bodyText = buildSummaryBody();

  // Post the summary review first (never bundle inline comments — one bad
  // anchor used to 422-reject the entire batch and drop all inline comments).
  let r = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      commit_id: HEAD_SHA,
      body: bodyText,
      event: "COMMENT",
    }),
  });

  if (!r.ok)
    throw new Error(
      `Review POST failed: ${r.status} ${(await r.text()).slice(0, 300)}`,
    );

  let posted = 0;
  for (const comment of comments) {
    if (await postInlineComment(comment)) posted++;
  }

  const skipped = comments.length - posted;
  const anchorSkipped = inlineCandidates.length - inlineFindings.length;
  console.log(
    `Posted summary review + ${posted}/${comments.length} inline comment(s)` +
      (anchorSkipped ? ` (${anchorSkipped} not on diff lines -> summary)` : "") +
      (skipped ? ` (${skipped} rejected by GitHub)` : "") +
      ".",
  );
}

try {
  await dismissOldReviews();
  await postReview();
} catch (err) {
  console.error("Agent failed:", err.message);
  process.exit(0);
}
