
# 🧪 Hands-On: Synchronous Invocation with AWS CLI

## 📘 Quick Recap

When you **test** a Lambda function using the **AWS Management Console**, you are performing a **synchronous invocation**:
- You **wait** for the Lambda function to execute
- You **receive the results immediately**
- If the function takes 2 minutes to run, you wait 2 minutes for the result

---

## 🖥️ Synchronous Invocation Using AWS CLI

You can also perform synchronous invocations via the **AWS CLI**, either in:
- **AWS CloudShell**
- **Your local terminal**

---

## 🛠️ Step-by-Step Instructions

### ✅ Step 1: Open AWS CloudShell or Terminal

Use AWS CloudShell (already configured) or configure your CLI locally.

Verify the CLI version:

```bash
aws --version
```

Expected output for AWS CLI v2:

```
aws-cli/2.x.x Python/3.x.x Linux/...
```

---

### ✅ Step 2: List Your Lambda Functions

Use this command to list functions in your region:

```bash
aws lambda list-functions --region eu-west-1
```

Output includes:
- Function Names
- Function ARNs
- Runtime information

> 📌 **Tip**: Always specify your correct AWS Region if using the CLI locally.

---

### ✅ Step 3: Prepare to Invoke the Function

Suppose your function name is `demo-lambda`.

Here’s the basic command to invoke it synchronously:

```bash
aws lambda invoke \
  --function-name demo-lambda \
  --payload '{"key1": "value1", "key2": "value2", "key3": "value3"}' \
  response.json \
  --region eu-west-1
```

### 🔥 Key Points:
- `--function-name`: Your Lambda function name (`demo-lambda`)
- `--payload`: JSON event data passed to the function
- `response.json`: File where the output is saved
- `--region`: (Optional in CloudShell) but needed for local CLI if region not default

---

### ✅ Step 4: View the Response

Once invoked, check the contents of `response.json`:

```bash
cat response.json
```

Expected output:

```json
"value1"
```

- `StatusCode: 200` indicates success
- The function executed and returned the expected value from the payload

---

## 🧠 Summary

- **Console "Test" button** = Synchronous invocation
- **AWS CLI invoke** = Synchronous invocation
- Client (you) **waits for result**
- Ideal for **testing**, **API responses**, and **real-time execution needs**

> 🚀 **Next Step**: Dive deeper into asynchronous invocations and event-driven Lambda architectures!
