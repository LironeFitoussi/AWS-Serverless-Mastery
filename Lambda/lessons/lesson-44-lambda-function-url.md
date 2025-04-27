# **AWS Lambda Function URL Overview**

AWS Lambda now supports **Function URLs**, allowing you to **expose a Lambda function** directly over the internet via a **simple HTTPS endpoint** — **without** needing **API Gateway** or a **Load Balancer**.

## **What is a Lambda Function URL?**

- **Direct HTTP Access**:
  - Instantly provides a **unique URL** (IPv4 and IPv6 supported) that **never changes**.
  - Accessible via:
    - Web browsers
    - Command-line tools (e.g., `curl`)
    - Postman
    - Any standard HTTP client

- **Public Only**:
  - Function URLs are accessible **over the public internet only**.
  - **Private access** (e.g., inside a VPC) is **not supported** with Function URLs.

- **Use Cases**:
  - Quick API setups
  - Serverless backend for web applications
  - Minimalist microservices without managing API Gateway

---

## **Managing Access to Function URLs**

### **Security Options**

- **AuthType: NONE**:
  - The URL is **public** and **unauthenticated**.
  - **Resource-based policy** must explicitly allow public access:
    ```json
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "lambda:InvokeFunctionUrl",
      "Resource": "your-lambda-function-arn"
    }
    ```

- **AuthType: AWS_IAM**:
  - Access is **authenticated and authorized** via **IAM**.
  - Requires:
    - An **identity-based policy** on the IAM user or role.
    - A **resource-based policy** on the Lambda function itself.
  - **Cross-account access**:
    - **Both** the identity and resource policies must explicitly allow invocation.

### **Resource-Based Policies**

- Used to **grant or restrict access** based on:
  - Specific **AWS accounts**
  - **IAM principals** (users, roles)
  - **IP address ranges** (CIDR blocks)

> **Tip**: This is very similar to how you manage access in **Amazon S3** with bucket policies.

---

## **CORS (Cross-Origin Resource Sharing) Support**

- Necessary if calling the **Lambda Function URL** from a **different domain**.
- Example Scenario:
  - Frontend hosted at **example.com** (via S3 + CloudFront).
  - Backend Lambda function hosted at **api.example.com**.
  - **Solution**:
    - Enable and configure **CORS** on the Lambda Function URL.
    - Specify allowed origins, methods, headers, etc.

---

## **Throttling and Reserved Concurrency**

- Use **Reserved Concurrency** on your Lambda function to **limit the number of concurrent executions**.
- Helps prevent your function from being overwhelmed by sudden surges in HTTP traffic.

---

# **Summary**

- **Lambda Function URLs** provide an **easy**, **serverless**, and **scalable** way to expose Lambda functions as HTTPS endpoints.
- **Security** can be configured using:
  - **Public access** (AuthType: NONE + resource policies).
  - **IAM authentication** (AuthType: AWS_IAM + identity & resource policies).
- **CORS settings** are critical for cross-origin requests.
- **Reserved concurrency** protects your function against traffic floods.
