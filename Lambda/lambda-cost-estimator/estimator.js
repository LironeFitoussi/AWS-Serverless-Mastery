import Decimal from "decimal.js";

export function estimateLambdaCost(durationMs, memoryUsedMB, monthlyInvocations = 0) {
  const duration = new Decimal(durationMs).div(1000);
  const memAlloc = Decimal.max(
    new Decimal(128),
    Decimal.ceil(new Decimal(memoryUsedMB).div(64)).mul(64)
  );
  const pricePerGBSec = new Decimal("0.0000166667");
  const pricePerMillionRequests = new Decimal("0.20");

  const gbSec = duration.mul(memAlloc.div(1024));
  const singleInvocationCost = gbSec.mul(pricePerGBSec);

  const monthlyDurationCost = singleInvocationCost.mul(monthlyInvocations);
  const monthlyRequestCost = new Decimal(monthlyInvocations).div(1_000_000).mul(pricePerMillionRequests);

  const totalMonthlyCost = monthlyDurationCost.add(monthlyRequestCost);

  return {
    memoryAllocatedMB: memAlloc.toNumber(),
    durationInSec: duration.toDecimalPlaces(6).toString(),
    invocationCostUSD: singleInvocationCost.toDecimalPlaces(10).toString(),
    monthlyDurationCostUSD: monthlyDurationCost.toDecimalPlaces(6).toString(),
    monthlyRequestCostUSD: monthlyRequestCost.toDecimalPlaces(6).toString(),
    totalMonthlyCostUSD: totalMonthlyCost.toDecimalPlaces(6).toString()
  };
}

export function simulateMemoryTiers(durationMs, monthlyInvocations = 60000) {
  const pricePerGBSec = new Decimal("0.0000166667");
  const pricePerMillionRequests = new Decimal("0.20");

  const duration = new Decimal(durationMs).div(1000); // sec

  const table = [];
  const tiers = [128, 256, 512, 1024, 1536, 2048, 3072, 4096, 5120];

  for (const mem of tiers) {
    const memDecimal = new Decimal(mem);
    const gbSec = duration.mul(memDecimal.div(1024));
    const invocationCost = gbSec.mul(pricePerGBSec);
    const monthlyCost = invocationCost.mul(monthlyInvocations);
    const requestCost = new Decimal(monthlyInvocations).div(1_000_000).mul(pricePerMillionRequests);
    const totalCost = monthlyCost.add(requestCost);

    table.push({
      memory: mem,
      duration: duration.toDecimalPlaces(6).toString(),
      costPerInvocation: invocationCost.toDecimalPlaces(10).toString(),
      totalMonthlyCost: totalCost.toDecimalPlaces(6).toString()
    });
  }

  return table;
}

export function suggestLambdaConfig(avgDurationMs, avgMemoryMB) {
  const timeout = Math.ceil(avgDurationMs / 1000) + 1;
  const memory = Math.max(128, Math.ceil(avgMemoryMB / 64) * 64);
  let storage = 512; // default

  if (avgMemoryMB > 1024) {
    storage = 1024;
  }
  if (avgMemoryMB > 2048) {
    storage = 2048;
  }
  if (avgMemoryMB > 4096) {
    storage = 3072;
  }

  return {
    memory,
    timeout,
    ephemeralStorageMB: storage
  };
}
