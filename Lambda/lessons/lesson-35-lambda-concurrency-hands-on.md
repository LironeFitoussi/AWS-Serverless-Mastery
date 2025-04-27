# **AWS Lambda: Hands-On with Concurrency Settings**

## **Accessing Concurrency Settings in Lambda**

To configure concurrency in AWS Lambda:

- Go to the **Configuration** tab.
- On the left-hand side, select **Concurrency**.

By default:
- Lambda functions use **unreserved account concurrency**.
- The **account-wide limit** is **1000 concurrent executions**, shared among **all Lambda functions**.

---

## **Setting Reserved Concurrency**

You can **edit** the concurrency settings for an individual Lambda function:
- Example: Reserve **20 concurrent executions** for a specific function.
- After setting:
  - That function is guaranteed **20 concurrent slots**.
  - The **remaining 980 slots** are available to all other functions.

> **Important:**  
> Setting **reserved concurrency** isolates a function’s performance and protects it from contention caused by other functions.

---

## **Testing Throttling with Reserved Concurrency**

You can **simulate throttling** by setting a function's **reserved concurrency to 0**:

- This forces the function to **always be throttled**.
- When you invoke the function:
  - You receive an error: **Invoke API action failed** — **Rate Exceeded**.

**Use Case:**  
Testing how your applications handle **throttle scenarios** gracefully.

---

## **Provisioned Concurrency: Reducing Cold Starts**

To mitigate **cold starts**, you can configure **Provisioned Concurrency**:

- Maintains a **warm pool** of pre-initialized Lambda instances.
- Reduces latency for first-time invocations.
- Configurable under **Provisioned Concurrency Configuration**.

### **Key Points:**
- You must apply provisioned concurrency to a **specific version** or **alias**.
- **Provisioned Concurrency cannot be set on `$LATEST`** directly.
- **Cost is associated** with provisioned concurrency, so choose numbers carefully.

---

## **Steps to Configure Provisioned Concurrency (Preview)**

1. **Publish a Version** of your Lambda function (not covered yet — upcoming lesson).
2. **Create an Alias** pointing to that version.
3. **Set Provisioned Concurrency** on the Alias or Version.

Example:  
Reserve **5 provisioned instances** to ensure minimal cold start impact.

---

## **Summary**

| Setting | Purpose | Notes |
|:--------|:--------|:------|
| Reserved Concurrency | Limit function's maximum concurrent executions | Protects account-wide concurrency |
| Setting to 0 | Force throttling | Useful for testing error handling |
| Provisioned Concurrency | Pre-warm Lambda instances to avoid cold starts | Requires versioning and has cost implications |