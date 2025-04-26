# 🧩 AWS Lambda Event Source Mapping

In this section, we explore **Event Source Mapping**, the final method for AWS Lambda to process events—alongside **asynchronous** and **synchronous** processing.

---

## 📌 What is Event Source Mapping?

Event Source Mapping is how AWS Lambda **polls records from event sources** like:

- **Amazon Kinesis Data Streams**
- **Amazon DynamoDB Streams**
- **Amazon SQS (Standard and FIFO)**

Lambda **polls** these services for records and invokes your Lambda **synchronously** when new data is available.

---

## 🔄 Event Source Mapping Workflow

1. A mapping is configured between the **Lambda function** and the **event source** (e.g., Kinesis).
2. Lambda **polls the source** through this mapping.
3. When records are available, they are sent to Lambda in **batches**.
4. Lambda invokes your function **synchronously** with the batch.

---

## 🧵 Event Source Mapping Types

There are **two categories**:
- **Streams**: Kinesis Data Streams, DynamoDB Streams
- **Queues**: SQS (Standard and FIFO)

---

## ⚙️ Streams: Kinesis & DynamoDB Streams

### Key Characteristics:
- An **iterator** is created for each shard.
- Records are **processed in order** at the shard level.
- You can choose where to start reading:
  - From the beginning
  - From the latest item
  - From a specific timestamp
- Records are **not removed** from the stream after processing (other consumers can read them too).

### Performance Considerations:
- **Low Traffic**: Use **batch windows** to collect more records before invoking Lambda.
- **High Throughput**: Enable **parallelization** (up to **10 parallel batches per shard**).

#### 💡 In-Order Processing with Parallelism
- Parallel processing occurs **at the partition key level**.
- Items for the same partition key are **processed in order**, even within parallel batches.

---

## ❌ Error Handling in Streams

### Default Behavior:
- If any record in a batch fails, **the entire batch is retried**.
- This can **block the entire shard** until the error is resolved.

### Mitigation Options:
- **Discard old events**
- **Limit retries**
- **Split batches on error**
- Send failures to **Lambda Destinations** (covered in the next lecture)

---

## 📬 Queues: SQS (Standard & FIFO)

### Processing Flow:
- Lambda uses **Long Polling** to read from SQS.
- The function is invoked **synchronously** with a batch of messages.
- You can configure the **batch size** (1–10).

### Configuration Tips:
- Set **queue visibility timeout** to:  
  `6 × Lambda function timeout`
- Use **Dead Letter Queue (DLQ)** on the **SQS queue**, not on the Lambda (DLQs only apply to **async** Lambda invocations).

---

## 📋 FIFO Queue Specifics

- Lambda supports **in-order processing** using **message group IDs**.
- The number of Lambda functions scales based on the number of **active message groups**.
- Ensures **strict ordering** per group.

---

## ⚠️ Error Behavior with SQS

- Failed batches are **returned to the queue as individual messages**.
- These can be **reprocessed in different groupings**.
- Sometimes, messages may be **received twice**, even without failure—ensure your Lambda logic is **idempotent**.

Once a message is successfully processed, **Lambda deletes it from the queue**.

---

## ⚡ Lambda Scaling with Event Source Mapping

### 🔹 Kinesis & DynamoDB Streams
- **1 Lambda invocation per shard**
- Up to **10 parallel batch processors per shard** (with parallelization)

### 🔹 SQS (Standard)
- **Scales rapidly**: +16 concurrent Lambda invocations **per minute**
- Max: **1,000 concurrent batch processors per second**

### 🔹 SQS FIFO
- Lambda scales based on **number of active message groups**
- Maintains **ordering per group**

---

## 📚 Summary

- Event Source Mapping is **essential for integrating Lambda with streaming and queue-based services**.
- Choose the right configuration based on:
  - Your traffic volume
  - Need for in-order processing
  - Error handling strategy
- **Know this well for the AWS exam**—it's a high-value topic!

---

> ✅ Next: We'll dive into the **hands-on configuration** of Event Source Mapping in AWS Lambda.