import { selectFunctionAndArgs } from "./prompts.js";
import { multiProfile } from "./utils/profiler.js";
import {
  estimateLambdaCost,
  simulateMemoryTiers,
  suggestLambdaConfig
} from "./estimator.js";

console.log("🚀 AWS Lambda Cost Estimator Tool (Pro)");

const { fn, args, monthlyInvocations, benchmarkCount } = await selectFunctionAndArgs();
const { result, durationMs, memoryUsedMB, error } = await multiProfile(fn, args, benchmarkCount);

if (error) {
  console.error("❌ Function error:", error.message);
  process.exit(1);
}

const safeMemoryMB = memoryUsedMB < 0.1 ? 128 : memoryUsedMB;

console.log("✅ Function output:", result);
console.log(`🔁 Averaged over ${benchmarkCount} runs`);
console.log(`⏱️  Time: ${durationMs.toFixed(6)} ms`);
console.log(`💾 Memory used: ${memoryUsedMB.toFixed(4)} MB`);

const {
  memoryAllocatedMB,
  durationInSec,
  invocationCostUSD,
  monthlyDurationCostUSD,
  monthlyRequestCostUSD,
  totalMonthlyCostUSD
} = estimateLambdaCost(durationMs, safeMemoryMB, monthlyInvocations);

console.log("\n📊 Lambda Estimation Breakdown:");
console.log(`- Memory allocated: ${memoryAllocatedMB} MB`);
console.log(`- Duration: ${durationInSec} sec`);
console.log(`- Estimated cost per invocation: $${invocationCostUSD}`);
console.log(`- Monthly duration cost: $${monthlyDurationCostUSD}`);
console.log(`- Monthly request cost: $${monthlyRequestCostUSD}`);
console.log(`- 💰 Estimated total monthly cost: $${totalMonthlyCostUSD}`);

console.log("\n🧠 Memory Tier Simulation:");
const memoryTiers = simulateMemoryTiers(durationMs, monthlyInvocations);
const roundedUsed = Math.ceil(safeMemoryMB);
memoryTiers.forEach(row => {
  let icon = "✅";
  if (row.memory < roundedUsed) icon = "⚠️";
  if (row.memory < 64) icon = "❌";

  console.log(`${icon} ${row.memory}MB: $${row.totalMonthlyCost} / mo | $${row.costPerInvocation} per call`);
});

console.log("\n🛠️ Suggested Lambda Configuration:");
const suggestions = suggestLambdaConfig(durationMs, safeMemoryMB);
console.log(`- Memory: ${suggestions.memory} MB`);
console.log(`- Timeout: ${suggestions.timeout} seconds`);
console.log(`- Ephemeral Storage: ${suggestions.ephemeralStorageMB} MB`);
