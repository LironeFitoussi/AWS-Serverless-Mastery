const fs = require('fs');
const path = require('path');

// Utility to convert titles to kebab-case
const kebabCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphen
    .replace(/^-+|-+$/g, '');    // Trim hyphens from start/end

const rawLessons = `
Lesson 332:
DynamoDB - Section Introduction
1m
May 15, 2025

Lesson 333:
DynamoDB Overview
8m
May 15, 2025

Lesson 334:
DynamoDB Basics - Hands On
9m
May 15, 2025

Lesson 335:
DynamoDB WCU & RCU - Throughput
11m
May 15, 2025

Lesson 336:
DynamoDB WCU & RCU - Hands On
4m
May 15, 2025

Lesson 337:
DynamoDB - Basic Operations
8m
May 16, 2025

Lesson 338:
DynamoDB Basic APIs - Hands On
3m
May 16, 2025

Lesson 339:
DynamoDB - Conditional Writes
6m
May 16, 2025

Lesson 340:
DynamoDB Indexes (GSI + LSI)
4m
May 16, 2025

Lesson 341:
DynamoDB Indexes (GSI + LSI) - Hands On
4m
May 16, 2025

Lesson 342:
DynamoDB PartiQL
3m
May 16, 2025

Lesson 343:
DynamoDB Optimistic Locking
2m
May 16, 2025

Lesson 344:
DynamoDB DAX
3m
May 16, 2025

Lesson 345:
DynamoDB DAX - Hands On
4m
May 16, 2025

Lesson 346:
DynamoDB Streams
4m
May 16, 2025

Lesson 347:
DynamoDB Streams - Hands On
6m
May 16, 2025

Lesson 348:
DynamoDB TTL
5m
May 16, 2025

Lesson 349:
DynamoDB CLI
5m
May 16, 2025

Lesson 350:
DynamoDB Transactions
4m
May 16, 2025

Lesson 351:
DynamoDB Session State
2m
May 16, 2025

Lesson 352:
DynamoDB Partitioning Strategies
1m
May 16, 2025

Lesson 353:
DynamoDB Conditional Writes, Concurrent Writes & Atomic Writes
2m
May 17, 2025

Lesson 354:
DynamoDB Patterns with S3
3m
May 17, 2025

Lesson 355:
DynamoDB Operations
2m
May 17, 2025

Lesson 356:
DynamoDB Security & Other
3m
May 17, 2025

Lesson 357:
Quiz 19: DynamoDB Quiz
0m
May 17, 2025
`;

// Output folder
const outputDir = path.join(__dirname, 'lessons');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Process lessons
const lessonBlocks = rawLessons.trim().split(/\n(?=Lesson \d+:)/g);

lessonBlocks.forEach((block, index) => {
  const lines = block.split('\n');
  const title = lines[1].trim(); // second line is title
  const lessonNumber = index + 1;
  const filename = `lesson-${lessonNumber}-${kebabCase(title)}.md`;

  fs.writeFileSync(path.join(outputDir, filename), ''); // Empty file
});

console.log('✅ Empty markdown files created with kebab-case names.');
