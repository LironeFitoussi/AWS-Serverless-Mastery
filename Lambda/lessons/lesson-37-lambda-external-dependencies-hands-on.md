# 🚀 Creating an AWS Lambda Function with Dependencies (Hands-On Guide)

In this hands-on exercise, we'll learn **how to create and deploy a Lambda function** that includes **external dependencies**. We'll also explore **CloudShell**, **npm**, **IAM roles**, and **AWS X-Ray tracing** for observability.

---

## 🛠 Environment Setup

**Tools used:**
- **AWS CloudShell** (browser-based terminal connected to your AWS account)
- **Node.js** and **npm** (pre-installed in CloudShell)

**Steps:**

1. **Launch CloudShell** in your AWS Management Console.
2. **Create a working directory:**
   ```bash
   mkdir Lambda
   cd Lambda
   ```
3. **Install a text editor (Nano):**
   ```bash
   sudo yum install -y nano
   ```

---

## 📄 Adding Your Lambda Function Code

1. Create the `index.js` file:
   ```bash
   nano index.js
   ```
2. Paste the provided code into `index.js`, save, and exit (Ctrl + X → Y → Enter).
3. Verify the file:
   ```bash
   cat index.js
   ```

---

## 📦 Managing Dependencies

**Required Dependency:**  
- **aws-xray-sdk-core** (for AWS X-Ray tracing)
- **aws-sdk** (already available in the Lambda runtime)

**Install the dependency:**
```bash
npm install aws-xray-sdk
```

**Outcome:**
- A `node_modules` folder is created.
- `package-lock.json` is generated.

---

## 🔒 Adjust File Permissions

Set appropriate permissions:
```bash
chmod -R 755 .
```

---

## 🗜 Package and Upload Lambda Function

1. **Zip the contents:**
   ```bash
   zip -r function.zip .
   ```
2. **Create an IAM Role** for Lambda:
   - Go to **IAM → Roles → Create Role**.
   - Choose **Lambda** as the service.
   - Attach the **AWSLambdaBasicExecutionRole**.
   - Name the role: `demo-lambda-with-dependencies`.
   - Create and **copy the role ARN**.

3. **Deploy the Lambda using AWS CLI:**
   ```bash
   aws lambda create-function \
     --function-name lambda-xray-with-dependencies \
     --runtime nodejs14.x \
     --role <YOUR_ROLE_ARN> \
     --handler index.handler \
     --zip-file fileb://function.zip
   ```

---

## ⚙ Configure Permissions and X-Ray

1. **Enable active tracing** in the Lambda configuration.
2. **Attach additional IAM policies:**
   - **AWSXRayDaemonWriteAccess**
   - **AmazonS3ReadOnlyAccess** (for listing S3 buckets)

---

## 🧪 Testing and Debugging

- **Create a test event** and invoke the function.
- If you see an **Access Denied error**, wait a few minutes for IAM permissions to propagate, then test again.

✅ On success, you should see a **list of S3 buckets** returned.

---

## 🔍 Observability with AWS X-Ray

- Go to **X-Ray Console → Service Map**.
- Visualize the Lambda invocation and downstream service calls (e.g., S3 API calls).
- Identify:
  - Successful traces (green)
  - Failed traces (red, showing 403 Access Denied)

**Use X-Ray Traces to:**
- Diagnose performance issues
- Spot permission problems
- Understand service interdependencies

---

## 🎯 Key Takeaways

- **CloudShell** simplifies setup by providing a pre-configured environment.
- **npm** is used to manage and package dependencies.
- **IAM Roles** are critical for granting Lambda necessary permissions.
- **AWS CLI** provides an efficient alternative to manual console uploads.
- **AWS X-Ray** enhances visibility into Lambda executions.

---

> This hands-on project covered Lambda packaging, dependency management, IAM permission setup, and observability using X-Ray — a complete workflow for production-grade serverless applications!