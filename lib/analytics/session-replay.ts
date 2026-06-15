export type ReplayChunk = {
  frameId: string;
  offsetMs: number;
  payload: string;
};

export function captureReplayFrame(frameId: string, offsetMs: number): ReplayChunk {
  return {
    frameId,
    offsetMs,
    payload: JSON.stringify({ frameId, offsetMs }),
  };
}
