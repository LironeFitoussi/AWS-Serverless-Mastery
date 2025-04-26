# 🔧 Hands-On: AWS Lambda Integration with EventBridge (CloudWatch Events)

In this walkthrough, you'll learn how to create a **scheduled EventBridge rule** that invokes a **Lambda function every minute**. This is a common use case for **serverless CRON jobs**.

---

## 📌 Step 1: Create a Lambda Function

- **Name**: `lambda-demo-eventbridge`
- **Runtime**: Python 3.9

### Sample Code:
```python
def lambda_handler(event, context):
    print("EventBridge event received:")
    print(event)
    return {
        'statusCode': 200,
        'body': 'Success'
    }
```

Deploy the function after creation.

---

## 📌 Step 2: Create an EventBridge Rule

1. Go to **Amazon EventBridge** → **Rules**
2. Click **Create rule**
3. **Name**: `InvokeLambdaEveryMinute`
4. **Event bus**: Select `default`

### Rule Type:
- Choose **Schedule**
- Click the link: **Continue to create rule**  
  *(This keeps it as an EventBridge rule instead of using EventBridge Scheduler)*

### Schedule Expression:
- Select **Rate expression**
- Enter: `1 minute`

---

## 📌 Step 3: Configure Target

- **Target type**: Lambda function
- **Select function**: `lambda-demo-eventbridge`
- (Optional) Configure retries, DLQ, and input data

Click **Next**, review the settings, then **Create rule**.

---

## ✅ Verification: Trigger Appears in Lambda

- Go to your Lambda function
- Refresh the page if needed
- Under **Triggers**, you should now see **EventBridge**
  - Source: `aws.events`
  - Type: `Scheduled Event`

---

## 🔐 Resource-Based Policy: EventBridge Permissions

Navigate to:
- **Lambda** → **Configuration** → **Permissions**

You’ll see a **Resource-based policy** like this:
```json
{
  "Effect": "Allow",
  "Principal": {
    "Service": "events.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:region:account-id:function:lambda-demo-eventbridge",
  "Condition": {
    "ArnLike": {
      "AWS:SourceArn": "arn:aws:events:region:account-id:rule/InvokeLambdaEveryMinute"
    }
  }
}
```

✅ This ensures **only your EventBridge rule** can invoke this Lambda.

---

## 📊 Monitoring Invocations

1. Go to **Lambda → Monitor → View logs in CloudWatch**
2. Look for the **log group**: `/aws/lambda/lambda-demo-eventbridge`
3. View the latest **log stream**

### Sample Log Output:
```json
{
  "version": "0",
  "id": "abcd-1234-xyz",
  "detail-type": "Scheduled Event",
  "source": "aws.events",
  "time": "2025-04-25T12:00:00Z",
  "region": "eu-west-1",
  "resources": ["arn:aws:events:region:account-id:rule/InvokeLambdaEveryMinute"],
  "detail": {}
}
```

---

## 🛑 Important: Disable the Rule

To stop periodic invocation:
- Go to **EventBridge → Rules**
- Find `InvokeLambdaEveryMinute`
- **Disable** the rule

---

## 📝 Summary

| Step                      | Description                               |
|---------------------------|-------------------------------------------|
| Lambda Trigger Source     | EventBridge Scheduled Event               |
| Invocation Frequency      | Every 1 minute (Rate expression)          |
| Permissions               | Auto-managed via resource-based policy    |
| Output Location           | CloudWatch Logs                           |
| Disable When Done         | Avoid unnecessary invocations             |

---

> 🧠 EventBridge makes it easy to create serverless schedulers and event-driven workflows. You can build CRON jobs, monitoring triggers, and automation flows with almost no infrastructure to manage.

🎯 You’ve now completed a working integration of **Lambda + EventBridge** using a **scheduled rule**!