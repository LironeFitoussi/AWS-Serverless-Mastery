const fs = require('fs');
const path = require('path');

// Utility to convert titles to kebab-case
const kebabCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphen
    .replace(/^-+|-+$/g, '');    // Trim hyphens from start/end

const rawLessons = `Lesson 283:
AWS Lambda - Section Introduction
1m
May 12, 2025

Lesson 284:
Serverless Introduction
2m
May 12, 2025

Lesson 285:
AWS Lambda Overview
7m
May 12, 2025

Lesson 286:
AWS Lambda - First Hands On
10m
May 12, 2025

Lesson 287:
Lambda Synchronous Invocations
2m
May 12, 2025

Lesson 288:
Lambda Synchronous Invocations Hands On
2m
May 12, 2025

Lesson 289:
Lambda & Application Load Balancer
3m
May 13, 2025

Lesson 290:
Lambda & Application Load Balancer Hands On
8m
May 13, 2025

Lesson 291:
Lambda Asynchronous Invocations & DLQ
3m
May 13, 2025

Lesson 292:
Lambda Asynchronous Invocations Hands On
6m
May 13, 2025

Lesson 293:
Lambda & CloudWatch Events / EventBridge
1m
May 13, 2025

Lesson 294:
Lambda & CloudWatch Events / EventBridge Hands On
5m
May 13, 2025

Lesson 295:
Lambda & S3 Event Notifications
2m
May 13, 2025

Lesson 296:
Lambda & S3 Event Notifications - Hands On
4m
May 13, 2025

Lesson 297:
Lambda Event Source Mapping
7m
May 13, 2025

Lesson 298:
Lambda Event Source Mapping Hands On (SQS)
7m
May 13, 2025

Lesson 299:
Lambda Event & Context Objects
3m
May 13, 2025

Lesson 300:
Lambda Destinations
3m
May 13, 2025

Lesson 301:
Lambda Destinations Hands On
7m
May 13, 2025

Lesson 302:
Lambda Permissions - IAM Roles & Resource Policies
3m
May 13, 2025

Lesson 303:
Lambda Permissions - IAM Roles & Resource Policies - Hands On
4m
May 13, 2025

Lesson 304:
Lambda Environment Variables
1m
May 13, 2025

Lesson 305:
Lambda Environment Variables - Hands On
3m
May 14, 2025

Lesson 306:
Lambda Monitoring & X-Ray Tracing
2m
May 14, 2025

Lesson 307:
Lambda Monitoring & X-Ray Tracing - Hands On
4m
May 14, 2025

Lesson 308:
Lambda@Edge & CloudFront Functions
6m
May 14, 2025

Lesson 309:
Lambda in VPC
4m
May 14, 2025

Lesson 310:
Lambda in VPC - Hands On
5m
May 14, 2025

Lesson 311:
Lambda Function Performance
5m
May 14, 2025

Lesson 312:
Lambda Function Performance - Hands On
6m
May 14, 2025

Lesson 313:
Lambda Layers
2m
May 14, 2025

Lesson 314:
Lambda Layers - Hands On
3m
May 14, 2025

Lesson 315:
Lambda File Systems Mounting
4m
May 14, 2025

Lesson 316:
Lambda Concurrency
6m
May 14, 2025

Lesson 317:
Lambda Concurrency Hands On
3m
May 14, 2025

Lesson 318:
Lambda External Dependencies
1m
May 14, 2025

Lesson 319:
Lambda External Dependencies - Hands On
9m
May 14, 2025

Lesson 320:
Lambda and CloudFormation
3m
May 14, 2025

Lesson 321:
Lambda and CloudFormation - Hands On
6m
May 15, 2025

Lesson 322:
Lambda Container Images
5m
May 15, 2025

Lesson 323:
Lambda Versions and Aliases
3m
May 15, 2025

Lesson 324:
Lambda Versions and Aliases - Hands On
6m
May 15, 2025

Lesson 325:
Lambda and CodeDeploy
3m
May 15, 2025

Lesson 326:
Lambda Function URL
4m
May 15, 2025

Lesson 327:
Lambda Function URL - Hands On
3m
May 15, 2025

Lesson 328:
Lambda - CodeGuru Integration
1m
May 15, 2025

Lesson 329:
Lambda Limits
2m
May 15, 2025

Lesson 330:
Lambda Best Practices
1m
May 15, 2025

Lesson 331:
Quiz 18: Lambda Quiz
0m
May 15, 2025
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
