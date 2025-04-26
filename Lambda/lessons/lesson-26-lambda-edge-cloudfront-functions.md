# Customization at the Edge: CloudFront Functions vs Lambda@Edge

In modern applications, **executing logic close to users** is important for reducing latency and improving responsiveness.  
AWS offers **Edge Functions** to allow customizations directly at CloudFront Edge locations.

---

## What Are Edge Functions?

**Edge Functions** are small pieces of code **attached to CloudFront distributions**.  
They run **close to the users** at the **Edge** to:
- Minimize latency
- Customize CDN behavior
- Improve application performance

**Benefits:**
- **No server management** required
- **Global deployment**
- **Fully serverless** and **pay-per-use**

---

## Use Cases for Edge Functions

- Website security and privacy
- Dynamic web applications at the Edge
- Search Engine Optimization (SEO)
- Intelligent routing across origins and data centers
- Bot mitigation
- Real-time image transformation
- A/B testing
- User authentication and authorization
- User prioritization
- User tracking and analytics

---

## Two Types of Edge Functions

AWS offers **two types** of Edge Functions:

| **Feature** | **CloudFront Functions** | **Lambda@Edge** |
|:------------|:--------------------------|:----------------|
| **Languages** | JavaScript only | Node.js, Python |
| **Scale** | Millions of requests/sec | Thousands of requests/sec |
| **Triggers** | Viewer Request, Viewer Response | Viewer Request, Origin Request, Origin Response, Viewer Response |
| **Max Execution Time** | \< 1 millisecond | Up to 5–10 seconds |
| **Deployment** | Native in CloudFront | Author in `us-east-1`, replicated globally |
| **Use Case Complexity** | Lightweight, latency-sensitive | Heavier, full-featured |

---

## CloudFront Functions

**Overview:**
- Lightweight **JavaScript** functions.
- Modify the **Viewer Request** and **Viewer Response**.
- Sub-millisecond execution time.
- Native to CloudFront; managed directly within the CloudFront service.

**Common Use Cases:**
- Cache key normalization
- HTTP header manipulation
- URL rewrites and redirects
- Simple authorization logic (e.g., JWT validation)

> **Ideal for:**  
> High-scale, ultra-low-latency customizations at the CDN layer.

---

## Lambda@Edge

**Overview:**
- Functions written in **Node.js** or **Python**.
- Modify **all four request/response types**:
  - Viewer Request
  - Origin Request
  - Origin Response
  - Viewer Response
- Longer execution times (up to 10 seconds).
- Adjustable CPU and memory settings.
- Supports network access and third-party libraries.
- File system access and full HTTP body access.

**Common Use Cases:**
- Advanced user authentication and authorization
- Data enrichment and transformation
- Real-time personalization
- Integrations with external APIs
- Complex content manipulation

> **Ideal for:**  
> Heavy processing tasks, external service integrations, or when response body customization is needed.

---

## Request/Response Lifecycle in CloudFront

```plaintext
Client → Viewer Request → (Optional CloudFront Function)
↓
CloudFront → Origin Request → (Optional Lambda@Edge)
↓
Origin → Origin Response → (Optional Lambda@Edge)
↓
CloudFront → Viewer Response → (Optional CloudFront Function / Lambda@Edge)
↓
Client
```

---

## Summary

| **Aspect** | **CloudFront Functions** | **Lambda@Edge** |
|:-----------|:--------------------------|:---------------|
| Execution Scope | Viewer Request/Response only | Viewer + Origin Requests and Responses |
| Performance | Ultra-fast, simple changes | Slower, complex logic |
| Use Cases | Light, high-frequency transformations | Deep, intelligent application logic |
| Languages Supported | JavaScript | Node.js, Python |

---

## Final Notes

Choosing between **CloudFront Functions** and **Lambda@Edge** depends on:
- **How complex** your processing needs are.
- **Where** in the request flow you need to make changes.
- **How much latency** you can afford.

---

## Coming Up

Next, we'll dive deeper into practical examples to **deploy and use Edge Functions** effectively!
