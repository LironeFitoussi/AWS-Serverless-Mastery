# 🧪 Hands-On: Asynchronous Lambda Invocation with Dead Letter Queue (DLQ)

In this guide, we explore how to:
- Invoke an AWS Lambda function **asynchronously** using the **AWS CLI**
- Confirm execution through **CloudWatch Logs**
- Configure a **Dead Letter Queue (DLQ)** for handling failed invocations

---

## 🔁 Asynchronous Lambda Invocation

### 1. **Create or Use an Existing Lambda Function**
- Name: `demo-lambda`
- Runtime: **Python 3.8**
- Sample code:
```python
def lambda_handler(event, context):
    print("Lambda event:", event)
    return event['key1']  # Or raise Exception to simulate a failure
```

---

### 2. **Invoke Lambda Asynchronously via CLI**

> 🔧 You can't invoke asynchronously from the Lambda Console—use **AWS CLI** in **CloudShell** or your local terminal:

```bash
aws lambda invoke \
  --function-name demo-lambda \
  --invocation-type Event \
  --payload '{"key1": "value1"}' \
  response.json
```

- This returns:
```json
{
  "StatusCode": 202
}
```

🔹 `202 Accepted` = Lambda was triggered asynchronously  
🔹 You won’t see the function's return value in this response.

---

### 3. **View Invocation Results in CloudWatch Logs**
- Go to Lambda → **Monitor** → **View Logs in CloudWatch**
- Open the latest log stream
- You’ll see the printed `event` object confirming invocation

---

## 💣 Simulating a Failure

Update the Lambda function to simulate a failure:
```python
def lambda_handler(event, context):
    print("Lambda event:", event)
    raise Exception("Something went wrong")
```

- Deploy changes and re-run the same CLI command
- Result: Still returns `202`, but the function **fails silently**

---

## 🧰 Configuring a Dead Letter Queue (DLQ)

### 1. **Create an SQS Queue for DLQ**
- Go to **SQS**
- Create a **Standard queue**: `lambda-DLQ`

---

### 2. **Configure DLQ in Lambda**
- Go to Lambda → **Configuration** → **Asynchronous invocation**
- Click **Edit**
- Set:
  - **Retry attempts**: 2 (default)
  - **Destination type**: SQS
  - **Queue**: `lambda-DLQ`
- Click **Save**

> ❗ You may see a permissions error (Lambda lacks `SendMessage` on SQS)

---

### 3. **Fix Lambda IAM Role**
- Go to Lambda → **Configuration → Permissions**
- Click the **Execution Role** to open IAM console
- Attach the policy:  
  `AmazonSQSFullAccess` *(or a custom policy with `sqs:SendMessage`)*

---

### 4. **Test Failure and DLQ Delivery**
- Re-run the failing CLI invocation:
```bash
aws lambda invoke \
  --function-name demo-lambda \
  --invocation-type Event \
  --payload '{"key1": "value1"}' \
  response.json
```

- Wait ~4 minutes (2 retries spaced out: 1min + 2min)
- Go to **SQS → lambda-DLQ** → **Send and receive messages**
- Click **Poll for messages**

### 🔍 Inspect the DLQ Message
- Message will include:
  - Original event payload
  - **Error cause**
  - **Lambda request ID**

> The request ID helps you trace the failure across CloudWatch Logs and SQS.

---

## 📝 Summary

| Feature                        | Description                                             |
|-------------------------------|---------------------------------------------------------|
| **Asynchronous Invocation**   | Returns `202`; does not wait for result                 |
| **Retries**                   | 3 total attempts (1 immediate, then +1min, +2min)       |
| **Idempotency Needed**        | Same event may be processed multiple times              |
| **DLQ Support**               | Unprocessed events sent to SQS/SNS after final retry    |
| **CloudWatch Logs**           | Only place to see logs/errors for async invocations     |

---

> 💡 **Tip for exams & real-world:** Know when to use DLQs, how retry policies work, and how asynchronous differs from synchronous invocation.

🎯 You now have a reliable, resilient Lambda function backed by a DLQ for guaranteed event capture!
