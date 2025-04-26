# AWS Lambda Destinations: A New Way to Handle Asynchronous Results

In **November 2019**, AWS introduced a **cool new feature** called **Lambda Destinations**, designed to improve the handling of **asynchronous invocations** and **event source mappings**.

## The Problem
Previously, it was difficult to:
- Determine whether an **asynchronous invocation** had **succeeded or failed**.
- **Retrieve data** after a failure or success.

## The Solution: Lambda Destinations
**Lambda Destinations** allow you to **route** the result of an asynchronous invocation—or the failure of an event source mapping—to a **specific destination**.

### Destinations for Asynchronous Invocations
You can define **destinations** for **both successful and failed events**.  
"Success" or "failure" refers to the **processing outcome** of the event.

**Supported destinations:**
- **Amazon SQS**
- **Amazon SNS**
- **Another Lambda function**
- **Amazon EventBridge** (formerly CloudWatch Events)

**Example Workflow:**
- An **S3 event** triggers a Lambda function asynchronously.
- On **success**, the result is sent to the **successful event destination**.
- On **failure**, the result is sent to the **failed event destination**.

> **Important:**  
> Lambda Destinations are **recommended over DLQs (Dead Letter Queues)** because:
> - DLQ only supports **SQS** and **SNS** for **failures**.
> - Destinations support **both successes and failures** to **SQS, SNS, Lambda, and EventBridge**.

You can still **use both Destinations and DLQs together** if needed.

---

## Event Source Mappings and Destinations

For **Event Source Mappings** (such as reading from **Kinesis** or **DynamoDB Streams**):
- If a **batch of events** fails processing, you can **redirect the batch** to a **destination** instead of blocking the stream.

**Supported failed destinations for Event Source Mappings:**
- **Amazon SQS**
- **Amazon SNS**

> **Note:**  
> If reading from **SQS** using Event Source Mapping, you can either:
> - Configure a **failed destination**.
> - Set up a **DLQ directly on the SQS queue**.

It’s up to you, depending on your architecture and use case.

---

## What's Next?
In the next session, the course will cover:
- **Hands-on practice** with Lambda Destinations.
- **Real-world scenarios** to reinforce learning.

---
