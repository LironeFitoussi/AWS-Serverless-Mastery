# **AWS Lambda: Final Best Practices and Exam Tips**

After diving deep into AWS Lambda, here are some **critical best practices** and **words of wisdom** to remember—especially important for both **real-world applications** and your **exam preparation**.

## **Optimize Your Lambda Function Code**

- **Move Heavy Work Outside the Handler**:
  - **Database connections** should be **initialized outside** the Lambda handler.
  - **AWS SDK initialization** should also happen **outside** the handler.
  - **Loading datasets or building dependencies** must be done outside the handler.
  - **Why?**  
    - Reduces the **cold start** time.
    - Improves overall **runtime efficiency**.

---

## **Use Environment Variables Correctly**

- Store **dynamic values** such as:
  - Database connection strings
  - S3 bucket names
  - API endpoints

- **Avoid hardcoding** these values inside your code.

- **For sensitive data**:
  - Encrypt environment variables using **AWS KMS (Key Management Service)**.
  - Protects secrets like passwords, API keys, and tokens.

---

## **Manage Deployment Package Size**

- Keep your **deployment package** **as small as possible**.
  - Only include **runtime necessities**.
  - Remove unused libraries and files.

- **Be mindful** of AWS Lambda package size limits:
  - Direct upload: **50 MB**
  - When zipped and uploaded to S3: **250 MB**

- **Use Lambda Layers**:
  - Offload shared libraries or dependencies.
  - Promotes better organization and smaller core deployment packages.

---

## **Avoid Recursive Lambda Calls**

- **Never design a Lambda function to call itself**.
  - Leads to **infinite loops**.
  - Quickly racks up **high costs** and **unexpected behavior**.

> **Tip**: Always design functions to be stateless and avoid direct self-invocation unless using specialized patterns like Step Functions for controlled recursion.

---

# **Summary**

✅ Perform heavy initialization **outside the handler**  
✅ Use **environment variables** wisely (and encrypt sensitive ones)  
✅ **Minimize deployment package size** and leverage **Lambda Layers**  
✅ **Avoid recursive calls** to prevent costly mistakes  
