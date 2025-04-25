
# 🌐 AWS Lambda Integration with Application Load Balancer (ALB)

## 📘 Overview

Sometimes, you want your Lambda function to be **accessible via HTTP/HTTPS**.  
To achieve this, you can use:
- **Application Load Balancer (ALB)** 
- **API Gateway** (discussed in the next section)

In this lecture, we focus on using the **ALB** to expose Lambda functions **to the internet**.

---

## 🔄 How ALB Communicates with Lambda

**Process:**
1. A client sends an **HTTP/HTTPS** request to the ALB.
2. The ALB **invokes the Lambda function synchronously**.
3. Lambda processes the request and **returns a response**.
4. ALB **forwards the Lambda response** back to the client.

---

## 🔎 HTTP Request → Lambda Invocation

When ALB invokes a Lambda function, it **translates the HTTP request into a JSON document**.

### Example Payload (simplified structure):

```json
{
  "requestContext": {
    "elb": {
      "targetGroupArn": "arn:aws:elasticloadbalancing:region:account-id:targetgroup/..."
    }
  },
  "httpMethod": "GET",
  "path": "/lambda",
  "queryStringParameters": {
    "name": "foo"
  },
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "optional request body",
  "isBase64Encoded": false
}
```

### Key Elements:
- **requestContext.elb**: Information about the invoking ALB and target group
- **httpMethod**: HTTP verb (GET, POST, PUT, etc.)
- **path**: Request path
- **queryStringParameters**: Key/value pairs
- **headers**: HTTP headers as key/value pairs
- **body**: Encoded or plain body content
- **isBase64Encoded**: Whether the body is base64-encoded

---

## 🔄 Lambda Response → HTTP Response

The Lambda function must **return a JSON response** for ALB to translate back to HTTP.

### Example Response (simplified structure):

```json
{
  "statusCode": 200,
  "statusDescription": "200 OK",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "response content",
  "isBase64Encoded": false
}
```

### Required Fields:
- **statusCode**: HTTP status code
- **statusDescription**: Human-readable description
- **headers**: Response headers
- **body**: Response content
- **isBase64Encoded**: Whether the body is base64-encoded

---

## 📚 Feature: ALB Multi-Value Headers

**Multi-Value Headers** allow the ALB to **handle multiple values for the same header or query string parameter**.

- Without this feature: ALB keeps only **one value** per key.
- With this feature: ALB keeps **all values** in an **array**.

### Example: Query String Parameters

Request URL:

```plaintext
/lambda?name=foo&name=bar
```

Without multi-value headers:
```json
"queryStringParameters": {
  "name": "bar"  // Last value wins
}
```

With multi-value headers enabled:
```json
"multiValueQueryStringParameters": {
  "name": ["foo", "bar"]
}
```

> 📌 **Tip**: This also applies to **HTTP headers** with multiple values!

---

## 🧠 Summary

- ALB can directly invoke **Lambda functions synchronously** over HTTP/HTTPS.
- ALB **translates HTTP requests into JSON events** and expects **JSON responses**.
- The **multi-value headers feature** ensures no data is lost when multiple values are present.
- This setup allows Lambda functions to be **publicly accessible without managing servers**.

> 🚀 **Next Up**: Explore exposing Lambda functions through **API Gateway** for even more flexibility!