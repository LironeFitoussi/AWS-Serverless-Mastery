# 🛠️ Hands-On: Using SQS and Kinesis as Event Source Mappers for AWS Lambda

In this practice session, we set up AWS Lambda to process messages from an **Amazon SQS queue**, and we also review how to configure **Kinesis** as another event source. This demonstrates the **event source mapping** concept in action.

---

## 🧪 Step-by-Step: Lambda + SQS Integration

### 1. **Create a Lambda Function**
- Name: `lambda-SQS`
- Runtime: **Python 3.8**
- Click **Create Function**

### 2. **Create an SQS Queue**
- Name: `lambda-demo-SQS`
- Type: **Standard Queue**
- Scroll down and click **Create Queue**

### 3. **Add SQS Trigger to Lambda**
- Go to the Lambda function → **Add Trigger**
- Select **SQS**
- Choose the queue: `lambda-demo-SQS`
- Set:
  - **Batch size** (e.g., 10)
  - **Batch window** (optional: delay before invoking to group messages)
- Enable the trigger
- Click **Add**

### 🔐 IAM Permission Error?

If you see an error like:

> “Execution role does not have permission to call ReceiveMessage on SQS”

Do the following:

### 4. **Fix IAM Role Permissions**
- In Lambda console → Configuration → Permissions
- Click the **IAM Role name**
- Attach the policy:  
  **`AWSLambdaSQSQueueExecutionRole`**
- Retry adding the trigger

Once successful, your Lambda is now linked with the SQS queue!

---

## ✍️ Writing the Lambda Code

Update your Lambda function to log the event and return a success message.

### 🧾 Python Handler Example:
```python
def lambda_handler(event, context):
    print("Event Received:", event)
    return {
        'statusCode': 200,
        'body': 'Success'
    }
```
- Click **Deploy** to save your changes.

---

## 🧪 Test the Integration

### 5. **Send a Test Message to SQS**
- Go to your SQS queue → **Send and Receive Messages**
- Enter message body: `hello world`
- Add a message attribute (optional): `foo: bar`
- Click **Send Message**

### 6. **Check Lambda Execution**
- Go to Lambda → **Monitor → View logs in CloudWatch**
- Open the latest log stream
- You should see:
  - Message body: `hello world`
  - Message attributes: `foo: bar`
  - Source: `SQS`

### ✅ Message Processed
Check SQS → **Send and Receive Messages**:
- **0 messages available** confirms Lambda successfully processed the message.

---

## ⚠️ Important: Disable the Trigger

To avoid continuous polling (and unnecessary costs):
- In Lambda triggers, **disable the SQS trigger**.

---

## 🔍 Bonus: Exploring Kinesis as an Event Source

Click **Add Trigger** → Choose **Kinesis** to view the configuration options:

### Key Configuration Options:
| Option                      | Description |
|-----------------------------|-------------|
| **Kinesis stream**          | Stream to attach to |
| **Consumer**                | Use enhanced fan-out if available |
| **Batch size**              | Number of records per batch |
| **Batch window**            | Wait time before invoking Lambda |
| **Starting position**       | `LATEST`, `TRIM_HORIZON`, or timestamp |
| **On-failure destination**  | Send failed messages elsewhere |
| **Retry attempts**          | Max retries before failing |
| **Max record age**          | Discard old data if expired |
| **Split batch on error**    | Process remaining items when one fails |
| **Parallelization per shard** | Up to 10 concurrent batches |
| **Tumbling window duration** | Useful for aggregation |
| **Report batch item failures** | Enhanced visibility on partial failures |

> ℹ️ You don’t need to memorize all of these options for the AWS exam, but be familiar with **core concepts**.

---

## 📝 Summary

- ✅ Set up Lambda to process messages from **SQS** using **event source mapping**
- ✅ Added necessary **IAM permissions**
- ✅ Validated message processing via **CloudWatch logs**
- 🧠 Explored **Kinesis integration** and its advanced options
- 🛑 Disabled the trigger afterward to save cost

---

> 🔄 Review this process before your exam—hands-on experience helps reinforce how Lambda integrates with event-driven services in AWS.