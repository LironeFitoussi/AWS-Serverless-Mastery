export async function profile(fn, args = []) {
  const start = process.hrtime.bigint();
  const startMem = process.memoryUsage().rss;

  let result;
  try {
    result = await fn(...args);
  } catch (error) {
    return { error, result: null, durationMs: 0, memoryUsedMB: 0 };
  }

  const end = process.hrtime.bigint();
  const endMem = process.memoryUsage().rss;

  const durationMs = Number(end - start) / 1e6;
  const memoryUsedMB = (endMem - startMem) / 1024 / 1024;

  return { result, durationMs, memoryUsedMB };
}

export async function multiProfile(fn, args = [], runs = 5) {
  const durations = [];
  const memories = [];
  let lastResult = null;

  for (let i = 0; i < runs; i++) {
    const { result, durationMs, memoryUsedMB, error } = await profile(fn, args);
    if (error) return { error };
    durations.push(durationMs);
    memories.push(memoryUsedMB);
    lastResult = result;
  }

  const avgDuration = durations.reduce((a, b) => a + b, 0) / runs;
  const avgMemory = memories.reduce((a, b) => a + b, 0) / runs;

  return {
    result: lastResult,
    durationMs: avgDuration,
    memoryUsedMB: avgMemory,
    error: null
  };
}
