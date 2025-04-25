# 🧪 Hands-On with AWS Lambda

## 📘 Getting Started with the Lambda Console

When navigating to the **AWS Lambda Console**, you might land on the `/discover` screen. For a more educational and interactive experience, try replacing the URL path with `/begin`.

This screen offers an intuitive overview of:
- **Lambda's serverless nature**
- Supported **programming languages** (Node.js, Python, Go, Java, .NET Core, Ruby, etc.)
- The concept of **uploading code** and having it executed by AWS on demand

---

## 🧰 Sample Function: "Hello from Lambda"

Example in **Python**:

```python
def lambda_handler(event, context):
    print(event)
    return "Hello from Lambda"
```

Running this function prints the event and returns a static message. Lambda executes your code **without you managing any servers**—a true serverless experience.

---

## ⚙️ Lambda Triggers and Scaling

### 🔁 Invocation Sources:
Lambda can be triggered by multiple AWS services and real-world use cases:

- 📸 **S3**: File upload triggers image processing
- 🔄 **Streaming Analytics (Kinesis)**: Real-time processing
- 📱 **IoT or Mobile Backends**
- ☎️ **API Gateway**: RESTful API integration

As you simulate more events (e.g., uploading files, triggering API calls), Lambda automatically **scales the number of concurrent executions** to match demand—no manual configuration needed.

---

## 💵 Cost Efficiency at Scale

Lambda uses **event-based billing**:
- Free tier: **1M requests & 400,000 GB-seconds/month**
- After the free tier: $0.20 per million requests + duration-based billing

> 🧮 **Example**: 2 million invocations may cost just $0.14—making Lambda extremely cost-effective at scale.

---

## 🏗️ Creating a Lambda Function via Blueprint

Steps to create your first Lambda:

1. Click **Create function**
2. Choose **"Use a blueprint"**
3. Search for and select **"hello-world"**
4. Select **Python 3.10** (or similar version)
5. Name your function, e.g., `demo-lambda`
6. Create a new role with **basic Lambda permissions**

---

## 📄 Function Code Walkthrough

Here's the default Python function code from the blueprint:

```python
def lambda_handler(event, context):
    print("value1 = " + event['key1'])
    print("value2 = " + event['key2'])
    print("value3 = " + event['key3'])
    return event['key1']
```

To **test**:
- Create a test event named `DemoEvent`
- Payload:
```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

The output will print all values and return `"value1"`.

---

## ⚠️ Error Handling and Logs

Modify the function to raise an exception:

```python
raise Exception("Something went wrong")
```

- Deploy the code
- Test to simulate a failed execution
- View detailed **CloudWatch Logs** via the Monitoring tab

Lambda will automatically create:
- A **log group** under `/aws/lambda/{function-name}`
- Separate **log streams** for each execution

---

## ⚙️ Key Configuration Settings

Accessible under the **Configuration > General Configuration** tab:

- **Memory**: 128MB – 10,240MB (more RAM = more CPU/network throughput)
- **Timeout**: Max 15 minutes per invocation
- **Execution Role**: IAM role assigned during function creation, controls access

---

## 📈 Monitoring and CloudWatch Integration

Lambda integrates tightly with **CloudWatch**:

- Track **invocation counts**
- Monitor **durations, errors, and success rates**
- Stream **logs** directly for debugging

> You can access log streams directly via **Monitoring > View logs in CloudWatch**.

---

## 🛡️ Permissions and IAM Roles

Each Lambda function has an **execution role** (IAM role) with policies such as:

```json
{
  "Action": [
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:PutLogEvents"
  ],
  "Resource": "*",
  "Effect": "Allow"
}
```

This allows your function to write to **CloudWatch Logs**.

---

## 📚 Runtime and Handler Settings

- **Runtime**: Python 3.7 (or later)
- **Handler**: `lambda_function.lambda_handler`
  - File: `lambda_function.py`
  - Function: `lambda_handler`

---

## ✅ Summary

With AWS Lambda, you can:

- Deploy code **without provisioning servers**
- **Scale automatically** based on traffic
- Use **many programming languages**
- Monitor and debug easily via **CloudWatch**
- Save cost via **pay-per-use billing**

> 🔜 **Next Up**: Dive deeper into integrations and more advanced Lambda patterns!
