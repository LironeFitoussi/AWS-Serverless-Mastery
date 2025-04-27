# **AWS Lambda: Handling Dependencies and Packaging**

## **Real-World Lambda Functions and External Dependencies**

In practical applications, **AWS Lambda functions** often require **external libraries** and **packages** beyond simple code examples.

Typical dependencies might include:
- **AWS X-Ray SDK** (for tracing)
- **Database Clients** (e.g., MySQL, PostgreSQL drivers)
- **Third-party libraries** (e.g., encryption libraries, APIs)

---

## **Packaging Dependencies for Lambda**

Each programming language has its own method for managing and packaging dependencies:

- **Node.js**:  
  - Use **NPM** to install dependencies in the `node_modules` directory.
- **Python**:  
  - Use **PIP** with the `--target` option to install dependencies into a specific folder.
- **Java**:  
  - Include the required **`.jar`** files.
- **Others**:  
  - Follow the dependency management conventions for that runtime.

> **Important:**  
> Always **zip the function code and its dependencies together** before uploading to Lambda.

---

## **Uploading Your Lambda Package**

- If your **ZIP package** is **less than 50 MB**, you can **upload it directly** to AWS Lambda.
- If the package is **larger than 50 MB**:
  - Upload it to **Amazon S3**.
  - Reference the S3 object from Lambda during deployment.

---

## **Special Considerations**

### **Native Libraries**
- Native libraries must be **compiled on Amazon Linux** (the same environment Lambda uses).
- This ensures **compatibility** at runtime.

### **AWS SDK**
- The **AWS SDK** is **pre-installed** with every Lambda environment.
- **You do not need to package the AWS SDK** yourself unless you require a **specific newer version**.

---

## **Summary**

| Component | Packaging Strategy |
|:----------|:--------------------|
| Code + Dependencies | Zip together into one file |
| Native Libraries | Compile on Amazon Linux |
| AWS SDK | Pre-included (no packaging needed unless custom version) |
| Upload Size ≤ 50MB | Direct upload to Lambda |
| Upload Size > 50MB | Upload to S3 and reference |