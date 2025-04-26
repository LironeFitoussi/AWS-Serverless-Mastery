# AWS Lambda Configurations: Environment Variables

Now that we've covered Lambda invocations, let's dive into **Lambda configurations and deployments**, starting with **Environment Variables**.

---

## What Are Environment Variables?

- **Environment Variables** are **key-value pairs** (both as strings) that are **attached to a Lambda function**.
- They allow you to **adjust your function’s behavior without modifying the code**.

**Key Points:**
- The variables are **accessible from within your code** during execution.
- Lambda also **automatically provides system environment variables** in the runtime environment.

> **Example:**  
> Set a database connection string, API endpoint, or feature toggle via environment variables instead of hardcoding them.

---

## Security and Encryption

You can **encrypt environment variables** for added security:
- Encryption can be done **automatically by Lambda** using a **service-managed key**.
- Or you can use your own **AWS Key Management Service (KMS) Customer Master Key (CMK)** for even more control.

> **Tip:**  
> Use encryption when storing **sensitive information** like passwords, tokens, or API keys.

---

## Summary

| **Feature** | **Details** |
|:------------|:------------|
| Definition | Key-value pairs available to your Lambda function |
| Purpose | Adjust function behavior without code updates |
| Security | Encrypt with Lambda's key or your own KMS CMK |
| Usage | Access values in your Lambda code at runtime |

---

## Coming Up

Next, we'll **practice creating and using environment variables** in a Lambda function!

---
