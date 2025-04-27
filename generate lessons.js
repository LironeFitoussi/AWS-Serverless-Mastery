const fs = require('fs');
const path = require('path');

// Utility to convert titles to kebab-case
const kebabCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphen
    .replace(/^-+|-+$/g, '');    // Trim hyphens from start/end

const rawLessons = `
Lesson 358:
API Gateway - Section Introduction
1m
May 17, 2025

Lesson 359:
API Gateway Overview
7m
May 17, 2025

Lesson 360:
API Gateway Basics Hands On
10m
May 17, 2025

Lesson 361:
API Gateway Stages and Deployment
4m
May 17, 2025

Lesson 362:
API Gateway Stages and Deployment Hands On
8m
May 17, 2025

Lesson 363:
API Gateway Stages Configurations Hands On
1m
May 17, 2025

Lesson 364:
API Gateway Canary Deployments
1m
May 17, 2025

Lesson 365:
API Gateway Canary Deployments Hands On
4m
May 17, 2025

Lesson 366:
API Gateway Integration Types & Mappings
6m
May 17, 2025

Lesson 367:
API Gateway Mapping Templates Hands On
4m
May 17, 2025

Lesson 368:
API Gateway Open API
3m
May 17, 2025

Lesson 369:
API Gateway Open API - Hands On
2m
May 18, 2025

Lesson 370:
API Gateway Caching
4m
May 18, 2025

Lesson 371:
API Gateway Usage Plans & API Keys
2m
May 18, 2025

Lesson 372:
API Gateway Monitoring, Logging and Tracing
5m
May 18, 2025

Lesson 373:
API Gateway CORS
1m
May 18, 2025

Lesson 374:
API Gateway Authentication and Authorization
7m
May 18, 2025

Lesson 375:
API Gateway Authentication and Authorization - Hands On
2m
May 18, 2025

Lesson 376:
API Gateway REST API vs HTTP API
1m
May 18, 2025

Lesson 377:
API Gateway Websocket API
7m
May 18, 2025

Lesson 378:
API Gateway - Architecture
2m
May 18, 2025
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
