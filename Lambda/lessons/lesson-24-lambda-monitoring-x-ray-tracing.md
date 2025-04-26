# AWS Lambda: Logging, Monitoring, and Tracing

Let's explore how **Lambda integrates with CloudWatch and AWS X-Ray** for **logging**, **monitoring**, and **tracing**.

---

## 1. Logging with CloudWatch Logs

- **All Lambda execution logs** are **automatically sent to CloudWatch Logs**.
- For this to work, your Lambda function must have:
  - An **IAM Execution Role** with permissions to write to CloudWatch Logs.
  - This is provided by the `AWSLambdaBasicExecutionRole` managed policy.

> **Reminder:**  
> CloudWatch Logs are critical for **debugging**, **monitoring**, and **auditing** your Lambda function executions.

---

## 2. Monitoring with CloudWatch Metrics

**CloudWatch Metrics** are automatically generated for every Lambda function and can be viewed in:
- The **CloudWatch Metrics UI**
- The **Lambda Monitoring tab** in the console

**Key Metrics Include:**
- **Invocations**: Number of function calls
- **Duration**: Time taken for each execution
- **Concurrent Executions**: Functions running at the same time
- **Error Counts**: Number of failed executions
- **Success Rate**: Percentage of successful invocations
- **Throttles**: Invocations that were throttled due to concurrency limits
- **Async Delivery Failures**: Failures in delivering asynchronous events
- **Iterator Age** (for Kinesis/DynamoDB streams): How far behind the stream reader is (in milliseconds)

---

## 3. Tracing with AWS X-Ray

Lambda functions can also be traced **end-to-end** using **AWS X-Ray**.

**Steps to Enable X-Ray Tracing:**
1. In your Lambda function **Configuration**, enable **Active Tracing**.
2. **AWS Lambda** automatically runs the **X-Ray Daemon** for you.

**Additional Requirements:**
- Attach the `AWSXrayWriteOnlyAccess` managed policy to the Lambda execution role.
- Use the **X-Ray SDK** in your code if you want to create custom segments or annotations.

---

## Important X-Ray Environment Variables

These environment variables help your Lambda function communicate with the X-Ray daemon:

| **Variable** | **Purpose** |
|:-------------|:------------|
| `AWS_XRAY_DAEMON_ADDRESS` | IP address and port where the X-Ray daemon is listening |
| `AWS_XRAY_CONTEXT_MISSING` | How the SDK handles missing context (e.g., log errors) |
| `AWS_XRAY_TRACING_NAME` | Custom tracing name for your service/application |

> **Tip:**  
> You can access these variables inside your code the same way as regular environment variables using, for example, `os.getenv()` in Python.

---

## Quick Summary

| **Feature** | **Tool/Service** | **Purpose** |
|:------------|:-----------------|:------------|
| Logging | CloudWatch Logs | View and troubleshoot function execution logs |
| Monitoring | CloudWatch Metrics | Analyze invocation patterns, performance, and errors |
| Tracing | AWS X-Ray | Visualize end-to-end request flow and debug latencies |

---

## Coming Up

Next, we'll move into a **hands-on lab** to practice working with **CloudWatch Logs**, **Metrics**, and **X-Ray Tracing** for Lambda functions!

---