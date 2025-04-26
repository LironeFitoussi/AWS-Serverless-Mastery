# 🧪 Hands-On: Triggering AWS Lambda with S3 Events

In this exercise, we set up an **AWS Lambda function** that gets invoked every time an object is uploaded to an **Amazon S3 bucket**.

---

## 📌 Step-by-Step: Lambda + S3 Event Notification

### 1. **Create a Lambda Function**
- **Name**: `Lambda-S3`
- **Runtime**: Python 3.8
- Click **Create Function**

---

### 2. **Create an S3 Bucket**
- Go to the **S3 console**
- Create a bucket named: `demo-s3-event-stephane`
- Ensure the bucket is in the **same region** as your Lambda function (e.g., `eu-west-1` / Ireland)
- Scroll down and click **Create Bucket**

---

### 3. **Configure S3 Event Notification**

In your S3 bucket:
- Go to **Properties** → Scroll to **Event notifications**
- Click **Create Event Notification**
  - **Name**: `invoke-lambda`
  - **Prefix**/**Suffix**: Leave blank (all files)
  - **Event Type**: Select `All object create events`
  - **Destination**: Choose **Lambda Function**
  - Select: `Lambda-S3`
- Click **Save changes**

This links your S3 bucket to your Lambda function.

---

### 4. **Verify Trigger in Lambda Console**

- Go to your Lambda function
- On the left-hand side under **Triggers**, you should now see **S3** listed
- This confirms that **S3 is configured to invoke your Lambda**

---

## ✍️ Update Lambda Code

Edit your Lambda function to log the received event:

### Example in Python:
```python
def lambda_handler(event, context):
    print("S3 Event Received:")
    print(event)
    return {
        'statusCode': 200,
        'body': 'Success'
    }
```

- Click **Deploy** to apply changes

---

## 🔐 Understanding S3 → Lambda Permissions

To allow the S3 bucket to invoke your Lambda:

- Go to **Configuration → Permissions** in the Lambda console
- Scroll to **Resource-based policy**
- You'll see a statement like:

```json
{
  "Effect": "Allow",
  "Principal": {
    "Service": "s3.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:eu-west-1:123456789012:function:Lambda-S3",
  "Condition": {
    "ArnLike": {
      "AWS:SourceArn": "arn:aws:s3:::demo-s3-event-stephane"
    }
  }
}
```

This ensures **only your specific S3 bucket** can invoke the Lambda function.

---

## ✅ Testing the Integration

### 1. **Upload a File to S3**
- Go to your bucket: `demo-s3-event-stephane`
- Click **Upload**
- Choose a file, e.g., `coffee.jpeg`
- Click **Upload**

### 2. **Check Lambda Execution**

- Go to Lambda → **Monitor** → **View logs in CloudWatch**
- Open the latest log stream
- You should see logs with:
  - `eventSource`: `aws:s3`
  - Object details (key, size, uploader)
  - Bucket name and region

This confirms the event was captured and processed by your Lambda function.

---

## 📝 Summary

- ✅ Created a **Lambda function** that is triggered by **S3 object creation**
- ✅ Configured **S3 event notification** to send events to Lambda
- ✅ Verified event delivery through **CloudWatch Logs**
- ✅ Reviewed **resource-based policy** for security

---

> 🎯 Knowing how Lambda integrates with S3 is essential for real-world automation and for AWS certifications. Keep this process in mind when designing serverless workflows!