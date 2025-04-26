# 🔁 AWS Lambda Asynchronous Invocation

Asynchronous invocations are a core feature of AWS Lambda, used when **immediate response isn’t needed** or when **high parallelism** is desired. In this lecture, we break down how it works and which AWS services support it.

---

## 🧠 What is Asynchronous Invocation?

In an **asynchronous invocation**, the service that triggers Lambda **does not wait** for the function to complete. Instead, the event is placed in an **internal Event Queue**, and Lambda processes it **in the background**.

---

## ⚙️ Example Workflow: S3 → Lambda

1. **S3 Bucket** receives a new file (object created).
2. An **event notification** is triggered.
3. Lambda receives this event **asynchronously**:
   - The event is placed in the internal **Event Queue**.
   - Lambda **reads from the queue** and tries to process it.

---

## 🔁 Retry Behavior

If Lambda fails to process the event:
- **Retry 1**: Immediately after failure
- **Retry 2**: 1 minute after first attempt
- **Retry 3**: 2 minutes after second attempt

Total: **3 attempts**

### ⚠️ Important: Idempotency
If your Lambda function is not **idempotent**, retries may cause:
- Duplicate operations
- Repeated side effects
- Duplicate **CloudWatch Logs**

**✔️ Make your Lambda function idempotent** so retries don’t affect business logic.

---

## 💥 What Happens After All Retries Fail?

You can define a **Dead Letter Queue (DLQ)**:
- **SQS or SNS** destination
- Events that failed after all retries will be sent here for:
  - Troubleshooting
  - Manual reprocessing
  - Alternative workflows

---

## 📈 Why Use Asynchronous Invocation?

| Scenario                         | Benefit                                 |
|----------------------------------|------------------------------------------|
| Services require async by design | No choice (e.g., S3, SNS)                |
| Large-scale batch processing     | Fire off 1000 invocations at once        |
| Non-blocking workflows           | Don't wait for a response from Lambda    |

---

## ✅ Common AWS Services That Use Asynchronous Invocation

| Service           | Use Case                                      |
|------------------|-----------------------------------------------|
| **S3**            | Event notifications on object uploads        |
| **SNS**           | Message-based trigger for Lambda             |
| **CloudWatch Events / EventBridge** | Trigger on scheduled or system events |
| **CodeCommit**    | Trigger on repo changes (branches, tags)     |
| **CodePipeline**  | Invoke during CI/CD pipeline (callback needed) |
| **CloudWatch Logs** | Log processing via subscription filters    |
| **SES**           | Process emails                                |
| **CloudFormation**| Invoke for custom resources                  |
| **AWS Config**    | Custom rule evaluation                       |
| **AWS IoT**       | Process IoT events                           |
| **IoT Events**    | React to detected IoT conditions             |

---

## 📝 Summary

- Asynchronous invocations:
  - Place events in a queue for background processing
  - Retry up to **3 times** automatically
  - Can forward failed events to a **DLQ**
- Key services:
  - **S3**, **SNS**, **CloudWatch Events/EventBridge**
- Best Practice:
  - Ensure **idempotency** in your Lambda functions
  - Use DLQs for **reliability** and **error recovery**

---

> 🚀 Next: We'll do a hands-on walkthrough to implement an asynchronous Lambda trigger using S3.
