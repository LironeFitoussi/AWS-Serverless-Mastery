# 📦 Integrating Amazon S3 Event Notifications with AWS Lambda

Amazon S3 supports **event notifications** that can trigger AWS services like **Lambda**, **SNS**, or **SQS** whenever specific events happen to your S3 objects.

---

## 🔔 What Are S3 Event Notifications?

S3 event notifications let you react to changes in objects, such as:

- Object **created**
- Object **removed**
- Object **restored** from Glacier
- **Replication** events

### 🔍 You can filter events by:
- **Prefix** (e.g., `images/`)
- **Suffix** (e.g., `.jpg`)

---

## 💡 Common Use Case: Image Thumbnail Generator

Whenever an image is uploaded to a bucket:
- **S3 triggers a Lambda function**
- Lambda generates a **thumbnail**
- Thumbnail is stored back in the bucket or sent elsewhere

---

## 🛠 Integration Patterns

### 1. **S3 → SNS → SQS → Lambda (Fan-Out Pattern)**
- S3 sends event to **SNS**
- SNS **fans out** to multiple **SQS queues**
- Each SQS queue has a Lambda attached

### 2. **S3 → SQS → Lambda**
- S3 sends events to a **single SQS queue**
- Lambda is configured with **event source mapping** to poll SQS

### 3. **S3 → Lambda (Direct Integration)**
- S3 sends the event **directly** to Lambda (async invocation)
- Lambda processes the object accordingly

✅ This is the **simplest** and most common integration for small to medium-scale applications.

---

## 🛡️ Error Handling and Reliability

- S3 to Lambda is **asynchronous**
- You can configure a **Dead Letter Queue (DLQ)** (e.g., SQS) for failed Lambda invocations

### ⚠️ Important: Event Delivery Caveats
- Notifications are usually delivered within **seconds**, but may **take up to a minute**
- **Enable bucket versioning** to prevent event loss in high-concurrency scenarios:
  > If two writes happen simultaneously on the same object **without versioning**, only **one event** may be delivered

---

## 🔄 Example Workflow

```text
[S3 Bucket]
     |
     v
[Lambda Function] → Process file (e.g., insert metadata into DynamoDB or RDS)
```

This pattern is useful for:
- Data ingestion pipelines
- Automated file processing
- Real-time metadata capture

---

## 📝 Summary

| Feature                     | Description                                             |
|-----------------------------|---------------------------------------------------------|
| **Event Types**             | Object create, delete, restore, replication             |
| **Destinations**            | Lambda, SQS, SNS                                        |
| **Filters**                 | Prefix and suffix                                       |
| **Integration Types**       | Direct, via SNS/SQS                                     |
| **Asynchronous Invocation** | Yes (with retry + DLQ support)                          |
| **Best Practice**           | Enable **versioning** to prevent event loss             |

---

> 🧪 Next: Let’s implement this pattern in a hands-on walkthrough using S3 and Lambda with direct event notifications.