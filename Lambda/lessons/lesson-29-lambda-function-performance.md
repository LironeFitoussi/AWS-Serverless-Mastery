# **AWS Lambda Configuration and Performance Optimization**

Optimizing your **Lambda function** settings is crucial to achieve the best performance and cost-efficiency. Let's break down the important concepts:

## **Memory (RAM) and vCPU Allocation**

- **Default RAM**: 128 MB
- **Maximum RAM**: 10,240 MB (10 GB)
- RAM can be increased **in 1 MB increments**.
- **More RAM = More vCPUs**:
  - The amount of **vCPU power** is proportional to the RAM.
  - **At 1,792 MB RAM**, you get **1 full vCPU**.
  - Above 1,792 MB, **multi-threading** becomes effective, since your function can leverage **more than 1 vCPU**.

> **Tip**: If your Lambda is **CPU-bound** (heavy computations), **increase RAM** to **decrease execution time**.

✅ **Common Exam Tip**: More RAM = Faster execution, even for I/O or CPU-intensive tasks.

---

## **Timeout Settings**

- **Default timeout**: 3 seconds
- **Maximum timeout**: 900 seconds (15 minutes)

> **Important**:  
> - Any task longer than **15 minutes** is **not a good fit for Lambda**.
> - Consider **Fargate**, **ECS**, or **EC2** for long-running processes.

✅ **Common Exam Tip**: Know the 15-minute execution limit for Lambda.

---

## **Execution Context and Performance Improvements**

### **What is Execution Context?**
- A **temporary runtime environment** maintained by AWS to optimize repeated Lambda calls.
- Useful for:
  - **Database connections**
  - **HTTP clients**
  - **SDK clients**
  - **/tmp storage**

If a Lambda is **invoked multiple times**, it can **reuse** these initialized components, improving speed and efficiency.

---

### **Good vs. Bad Code Practices**

❌ **Bad Practice: Initialize resources inside the handler**

```python
def get_user_handler(event, context):
    db_url = os.getenv('DB_URL')
    db_client = database.connect(db_url)  # Will reconnect on every invocation
    # ... fetch user
```

Every invocation creates a new DB connection — **inefficient** and **slow**.

---

✅ **Best Practice: Initialize resources outside the handler**

```python
db_url = os.getenv('DB_URL')
db_client = database.connect(db_url)  # Only created once

def get_user_handler(event, context):
    # ... use db_client directly
```

- Database client is initialized **once** and **reused** across multiple invocations.
- **Performance boost** due to connection reuse.

✅ **Common Exam Tip**:  
Move **heavy initializations** **outside** the handler function.

---

## **Using the `/tmp` Directory**

- **Available Disk Space**: Up to **10 GB**.
- **Purpose**: Temporary file storage during Lambda execution.
- Files in `/tmp`:
  - **Survive between invocations** (within the same execution context).
  - Help **save time** on operations like large file downloads or processing.
  
> **Note**: `/tmp` is **ephemeral**; no guarantee between different container instances.

---

### **Security and Encryption of `/tmp` Data**

- **No native encryption** for `/tmp` files.
- To encrypt sensitive data:
  - Use **AWS KMS** to **generate data keys**.
  - **Encrypt** files manually within your Lambda function.

---

# **Key Takeaways**

✅ More **RAM = More vCPUs** and **better performance**.  
✅ **Timeout limit** is **15 minutes** maximum.  
✅ Reuse **connections and clients** by **initializing them outside** the Lambda handler.  
✅ Leverage the **/tmp directory** for temporary file storage up to **10 GB**.  
✅ Encrypt sensitive `/tmp` data manually using **KMS**.

