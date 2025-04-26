# 🧠 Understanding the `event` and `context` Objects in AWS Lambda

When writing AWS Lambda functions, two essential parameters are passed to your function handler:

- **`event`**: Contains the actual data passed from the invoking service.
- **`context`**: Contains metadata about the invocation and the runtime environment.

---

## 📦 The `event` Object

The `event` object is a **JSON-formatted document** that includes all the relevant data from the **invoking AWS service** (e.g., EventBridge, SQS, SNS, API Gateway).

### 🔍 Key Characteristics:
- Represents **what triggered** your Lambda function.
- Contains all the necessary **payload information** for your function to process.
- Converted into a native object depending on the runtime:
  - **Python**: Converted to a **dictionary**
  - **Node.js**: Converted to a **JavaScript object**

### 📌 Example Event Data Fields (from EventBridge):
```json
{
  "source": "aws.events",
  "region": "us-east-1",
  "detail-type": "Scheduled Event",
  ...
}
```

---

## 🧾 The `context` Object

The `context` object provides **runtime metadata** about the Lambda function's **execution environment** and **current invocation**.

### 🔍 Common Attributes:
| Property               | Description                                      |
|------------------------|--------------------------------------------------|
| `context.aws_request_id` | Unique ID for the current request             |
| `context.function_name`  | Name of the Lambda function                   |
| `context.memory_limit_in_mb` | Memory allocated to the function        |
| `context.log_group_name` | CloudWatch Log Group name                     |
| `context.log_stream_name` | CloudWatch Log Stream name                  |
| `context.function_version` | Version of the Lambda function              |
| `context.invoked_function_arn` | ARN used to invoke the function       |

---

## 🛠️ Example in Python

```python
def lambda_handler(event, context):
    # Access event details
    print("Event Source:", event.get("source"))
    print("Event Region:", event.get("region"))

    # Access context metadata
    print("Request ID:", context.aws_request_id)
    print("Function Name:", context.function_name)
    print("Memory Limit (MB):", context.memory_limit_in_mb)
```

---

## 📝 Summary

- Use the **`event` object** to access data from the service that triggered your Lambda.
- Use the **`context` object** to access metadata about the invocation and environment.
- Knowing **which object contains what data** is essential—especially for AWS certification exams.

> 🎯 Tip: Practice identifying which fields belong to `event` vs `context`—it's a common exam topic!

---

✅ See you in the next lecture!
