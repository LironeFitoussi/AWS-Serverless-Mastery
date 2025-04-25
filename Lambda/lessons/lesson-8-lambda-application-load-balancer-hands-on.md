
# 🌐 Hands-On: Integrating AWS Lambda with Application Load Balancer (ALB)

## 📘 Overview

In this walkthrough, we create:
- A **Lambda function** to handle HTTP requests
- An **Application Load Balancer (ALB)** to expose the Lambda to the internet
- A **Target Group** that registers the Lambda function
- Proper **permissions and response formatting** for the integration

---

## 🛠️ Step 1: Create the Lambda Function

Create a basic Lambda function:
- **Name**: `Lambda-alb`
- **Runtime**: Python 3.x
- **Code**: Simple return statement

Example Lambda code:

```python
def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "statusDescription": "200 OK",
        "headers": {
            "Content-Type": "text/html"
        },
        "body": "Hello from Lambda",
        "isBase64Encoded": False
    }
```

- Add a `print(event)` statement to log incoming requests for debugging.
- **Deploy** changes after modifying code.

---

## 🛠️ Step 2: Create the Application Load Balancer

- **Type**: Application Load Balancer (ALB)
- **Name**: `demo-Lambda-alb`
- **Scheme**: Internet-facing (IPv4)
- **Availability Zones**: Select at least two
- **Security Group**: Create a new one (`DemoLambdaALBSG`)
  - Allow **HTTP (port 80)** inbound traffic from anywhere

---

## 🛠️ Step 3: Create a Target Group for Lambda

- **Type**: Lambda function
- **Name**: `demo-tg-lambda`
- **Register**: The Lambda function (`Lambda-alb`) into the target group

---

## 🛠️ Step 4: Complete Load Balancer Setup

- Set the **listener** for HTTP on port 80
- Default action: **Forward to Target Group** (`demo-tg-lambda`)
- **Launch** the Load Balancer

---

## 🧪 Step 5: Test the Integration

1. Get the **DNS name** of the ALB.
2. Open it in a browser.

If properly configured, you will **see "Hello from Lambda" rendered in the browser**, not downloaded as a file.

---

## ⚙️ How Lambda Handles ALB Requests

When ALB invokes Lambda:
- HTTP request → Translated into a **JSON event**
- JSON event includes:
  - `httpMethod`
  - `path`
  - `headers`
  - `queryStringParameters`
  - `body`
  - `isBase64Encoded`

View the logs in **CloudWatch** to inspect the exact event structure.

---

## 🔥 ALB Response Formatting

Lambda must return the following structure for ALB:

```json
{
  "statusCode": 200,
  "statusDescription": "200 OK",
  "headers": {
    "Content-Type": "text/html"
  },
  "body": "Hello from Lambda",
  "isBase64Encoded": false
}
```

- Proper **headers** ensure the browser displays content instead of downloading it.
- **Content-Type** is key (e.g., `text/html`).

---

## 📚 Feature: Multi-Value Headers

ALB offers **multi-value headers** support:
- Enable via **Target Group > Attributes**.
- Allows **multiple values** for:
  - HTTP Headers (e.g., multiple `Accept` headers)
  - Query String Parameters (e.g., `?name=foo&name=bar`)

If enabled, Lambda must adjust parsing accordingly because values become **arrays** instead of single strings.

---

## 🔐 Permissions: Resource-Based Policies

When using ALB with Lambda:
- A **resource-based policy** is automatically attached to the Lambda.
- This policy **grants permission** to the ALB to invoke the function.

Example (simplified):

```json
{
  "Effect": "Allow",
  "Principal": {
    "Service": "elasticloadbalancing.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:your-region:your-account-id:function:Lambda-alb"
}
```

You can view this policy under:
- **Configuration > Permissions** on the Lambda Console

---

## 🧹 Cleanup Steps

To avoid incurring charges:
- **Delete the ALB**
- Optionally, **delete the target group and Lambda function**

---

## 🧠 Summary

By integrating Lambda with ALB, you achieve:
- **Serverless HTTP endpoints** without managing servers
- **Auto-scaling** based on incoming requests
- **Simple and cost-effective** architecture for lightweight APIs or backends

> 🚀 **Next Step**: Learn how to expose Lambda functions using **API Gateway** for more advanced features!
