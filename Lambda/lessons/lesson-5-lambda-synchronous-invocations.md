
# 🔁 Synchronous Invocation in AWS Lambda

## 📘 What Is a Synchronous Invocation?

A **synchronous invocation** means:
- The **caller waits** for the Lambda function to execute
- The result (or error) is returned **immediately**
- **Errors must be handled by the client** (e.g., retries, backoff)

> ✅ Example: When you use the **AWS CLI**, SDKs, or the **Lambda Console** to invoke a Lambda function and wait for its result — that’s a synchronous invocation.

---

## 🧩 Synchronous Invocation Flow

```plaintext
Client → Lambda → Response
```

### 📶 Example with API Gateway:
1. A user sends a request to **API Gateway**
2. API Gateway **invokes the Lambda function**
3. Lambda runs the code and returns the response
4. API Gateway **passes the result back to the user**

All this happens within a single request-response cycle — making it **synchronous**.

---

## 🛠️ Error Handling

In synchronous invocations:
- If the Lambda function **fails**, the client is responsible for handling the error.
- Retry logic, such as **manual retry** or **exponential backoff**, must be implemented **by the client** or API consumer.

> 🧠 **Tip**: For retries, consider using exponential backoff to avoid overloading the service or causing repeated failures.

---

## 🧵 Services That Invoke Lambda Synchronously

Here are some common AWS services that perform **synchronous invocations**:

| Service                                   | Synchronous? | In This Course? |
|-------------------------------------------|--------------|------------------|
| **API Gateway**                            | ✅ Yes       | ✅ Yes           |
| **Application Load Balancer (ALB)**        | ✅ Yes       | ✅ Yes           |
| **CloudFront (Lambda@Edge)**               | ✅ Yes       | ✅ Yes           |
| **AWS CLI & SDKs**                         | ✅ Yes       | ✅ Yes           |
| Amazon S3 Batch                            | ✅ Yes       | ❌ No            |
| Amazon Cognito                             | ✅ Yes       | ✅ Yes           |
| AWS Step Functions (synchronous workflow)  | ✅ Yes       | ✅ Yes           |
| Amazon Lex, Alexa                          | ✅ Yes       | ❌ No            |
| Amazon Kinesis Data Firehose               | ✅ Yes       | ❌ No            |

> 📌 **Note**: All **user-initiated invocations** (e.g., from CLI or SDK) are synchronous by default.

---

## 🧪 Coming Up Next: Hands-On Practice

Now that you understand what synchronous invocations are and how they work, it's time to **try it in action**. In the hands-on portion, you’ll:

- Trigger a Lambda function synchronously
- Observe the response and execution flow
- Handle success and failure scenarios manually

> 🔜 **Next Step**: Let’s play with Lambda synchronous invocations using the console or CLI!
