# **Lambda Function Configuration and Performance Hands-On**

In this session, we explored key **Lambda configuration settings** — focusing on **memory**, **timeouts**, and **execution context optimizations** — and demonstrated their real-world impact on function performance.

---

# **General Configuration Options**

## **Memory Allocation and CPU Scaling**

- **Memory Range**: 1 MB to 10,240 MB (10 GB).
- **CPU Power** scales **proportionally** with memory.
- **Higher Memory = More vCPUs** ➔ Faster execution, but **higher cost**.
  
> **Important**:  
> - No way to manually set CPU independently; you adjust memory to implicitly adjust CPU.
> - Always **monitor memory usage** to strike a balance between **performance** and **cost**.

✅ **Exam Tip**: Increase memory to get **faster CPU performance**.

---

## **Timeout Settings**

- **Default Timeout**: 3 seconds
- **Maximum Timeout**: 900 seconds (15 minutes)

Timeout determines **how long** Lambda allows execution before forcefully **terminating** the function.

### **Demonstration: Timeout Behavior**

- **Scenario 1**:  
  - Code: `time.sleep(2)`
  - **Timeout**: 3 seconds
  - **Result**: Successful execution (~2 seconds)

- **Scenario 2**:  
  - Code: `time.sleep(5)`
  - **Timeout**: 3 seconds
  - **Result**: **Timeout Error** after 3 seconds.

- **Scenario 3**:  
  - Increased Timeout: 6 seconds
  - Code: `time.sleep(5)`
  - **Result**: Successful execution (~5 seconds)

> **Best Practice**:  
> Set a **reasonable timeout** based on expected execution time.  
> **Avoid maxing out** to 15 minutes unless necessary — it helps detect errors faster.

✅ **Exam Tip**: Timeout must be chosen thoughtfully to optimize **error handling** and **retry logic**.

---

# **Performance Optimization with Execution Context**

## **Problem: Inefficient Resource Initialization**

**Bad practice**: Opening expensive connections (e.g., DB connections) **inside the Lambda handler**.

```python
def lambda_handler(event, context):
    db_client = connect_to_db()
    # process with db_client
```

- Every invocation **recreates** the DB connection ➔ **Slower performance**.

---

## **Solution: Initialize Resources Outside the Handler**

**Good practice**: Move heavy initializations **outside** the Lambda handler.

```python
db_client = connect_to_db()  # Initialized once

def lambda_handler(event, context):
    # Reuse db_client
```

### **Demonstration:**

- First invocation:
  - Takes time (e.g., 3 seconds) to initialize.
- Subsequent invocations:
  - Execution happens almost instantly (sub-millisecond speeds).

✅ **Key Observation**:
- **Initialization time** (cold start) is paid once per container lifecycle.
- **Warm invocations** reuse the already-established resources ➔ **Much faster execution**.

✅ **Exam Tip**: Always initialize expensive resources (e.g., database clients, API clients) **outside** the handler for **better performance**.

---

# **Key Takeaways**

| Setting               | Best Practice                                                                 |
|------------------------|-------------------------------------------------------------------------------|
| **Memory & CPU**        | Increase memory to gain more CPU power; monitor and optimize for cost.        |
| **Timeout**             | Set a timeout appropriate to the expected runtime, not always the maximum.   |
| **Resource Initialization** | Move heavy initializations outside the Lambda handler to speed up repeated invocations. |
| **Cold Start Management** | Expect a longer execution time only during the first (cold) invocation.    |

