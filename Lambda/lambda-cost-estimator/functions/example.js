export function add(a, b) {
  return Number(a) + Number(b);
}

export async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, Number(ms)));
}

// Simulates high memory usage
export function bigArray(sizeMB = 100) {
  const size = Math.floor((Number(sizeMB) * 1024 * 1024) / 8); // approximate number of float64s
  const arr = new Array(size).fill(0).map((_, i) => i * Math.random());
  return arr.length;
}

// Simulates CPU load
export function heavyComputation(limit = 1000000) {
  let sum = 0;
  for (let i = 0; i < Number(limit); i++) {
    sum += Math.sqrt(i) * Math.sin(i) * Math.log(i + 1);
  }
  return sum;
}
