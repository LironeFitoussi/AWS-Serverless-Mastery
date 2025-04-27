# **Understanding AWS Lambda Layers**

**Lambda Layers** are a powerful feature that **enhance modularity** and **optimize deployment workflows** for AWS Lambda functions.

---

# **What Are Lambda Layers?**

Lambda Layers allow you to:

1. **Create Custom Runtimes**  
   - Support additional programming languages **not natively supported** by Lambda.
   - Examples:
     - **C++**
     - **Rust**

2. **Externalize and Reuse Dependencies**  
   - Move **heavy libraries and dependencies** out of the main application package.
   - **Reuse** these dependencies across **multiple Lambda functions** without duplicating them.

---

# **Why Use Lambda Layers?**

Without layers:
- Your Lambda **application package** could include all code and dependencies.
- **Every update** requires **repacking and re-uploading** the entire bundle, even if dependencies haven’t changed.

With layers:
- **Application code** remains small and lightweight (e.g., **20 KB**).
- **Dependencies** are moved into separate **layers** (e.g., 10 MB and 30 MB).
- Functions reference the **layers** instead of repacking the dependencies every time.

✅ **Benefits**:
- **Faster deployments** — only your small application code is updated.
- **Reduced bandwidth and storage use**.
- **Easier dependency management** across multiple Lambda functions.

---

# **Architecture of Lambda Layers**

```plaintext
[ Lambda Function (20 KB) ]
        ↓
[ Layer 1 (10 MB) ]
[ Layer 2 (30 MB) ]
```

- The Lambda function **references** the externalized layers.
- **Multiple Lambda functions** can reference **the same layers**, promoting **code reuse** and **consistency**.

> **Example**:  
> One set of common libraries (e.g., pandas, numpy) can be packaged into a layer and used by dozens of Lambda functions.

---

# **Key Points to Remember**

| Feature                  | Details                                                      |
|---------------------------|--------------------------------------------------------------|
| **Custom Runtime Support** | Languages like **C++** and **Rust** can be added through layers. |
| **Reusable Dependencies** | Package libraries separately to avoid re-uploading them repeatedly. |
| **Deployment Optimization** | Only update lightweight application code instead of the full dependency set. |
| **Multi-Function Sharing** | Multiple Lambda functions can reference the same layers. |

✅ **Exam Tip**: Use **Lambda Layers** to **externalize libraries** and **accelerate deployment times**.
