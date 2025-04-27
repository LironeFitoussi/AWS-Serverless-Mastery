import { profile } from "./utils/profiler.js";
import { estimateLambdaCost, suggestLambdaConfig } from "./estimator.js";
import { bigArray } from "./functions/example.js";
import fs from "fs";

const testCases = [10, 50, 100, 200, 300]; // MB
const results = [];

for (const size of testCases) {
  console.log(`\nRunning bigArray(${size})...`);

  const { result, durationMs, memoryUsedMB, error } = await profile(bigArray, [size]);

  if (error) {
    console.error(`❌ Error for size ${size}:`, error.message);
    continue;
  }

  const safeMemoryMB = memoryUsedMB < 0.1 ? 128 : memoryUsedMB;
  const costEstimation = estimateLambdaCost(durationMs, safeMemoryMB, 60000);
  const suggestions = suggestLambdaConfig(durationMs, safeMemoryMB);

  const testResult = {
    sizeMB: size,
    output: result,
    durationMs: durationMs.toFixed(3),
    memoryUsedMB: memoryUsedMB.toFixed(3),
    costPerCallUSD: costEstimation.invocationCostUSD,
    suggestedMemory: suggestions.memory,
    suggestedTimeout: suggestions.timeout,
    suggestedStorage: suggestions.ephemeralStorageMB
  };

  console.table(testResult);
  results.push(testResult);
}

// Save results to JSON
fs.writeFileSync("bigArray_test_report.json", JSON.stringify(results, null, 2));
console.log("\n📄 Test report saved to bigArray_test_report.json");
