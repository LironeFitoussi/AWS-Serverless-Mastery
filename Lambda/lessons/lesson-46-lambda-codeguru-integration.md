# **Integrating AWS Lambda with Amazon CodeGuru Profiler**

AWS Lambda integrates with **Amazon CodeGuru Profiler** to provide **runtime performance insights**, helping developers optimize and troubleshoot Lambda function execution.

## **What is CodeGuru Profiler?**

- **CodeGuru Profiler** collects **runtime performance data**.
- It helps identify:
  - **Bottlenecks**
  - **Hot paths**
  - **Performance issues**
- Supported for Lambda functions written in **Java** and **Python**.

---

## **How Lambda and CodeGuru Profiler Work Together**

### **Activation Steps**

- From the **Lambda Console**, you can **activate CodeGuru profiling** with a few clicks.
- Once activated:
  - A **Profiler Group** is created and linked to your Lambda function.
  - **Performance data** starts being collected and analyzed automatically.

### **What Happens Behind the Scenes**

- **Lambda Layer Added**:
  - A **CodeGuru Profiler Layer** is attached to your Lambda function.
  - This layer instruments the function at runtime to gather performance metrics.

- **Environment Variables Configured**:
  - Lambda sets **environment variables** related to CodeGuru Profiler automatically.
  - These variables help the profiler agent know how to report the collected data.

- **IAM Role Permissions Updated**:
  - The Lambda function's execution role must include the **AmazonCodeGuruProfilerAgentAccess** managed policy.
  - This policy allows the profiler to securely send data to CodeGuru.

---

## **Key Requirements**

| Requirement                     | Details |
|----------------------------------|---------|
| **Supported Runtimes**           | Java and Python |
| **Activation**                   | Via Lambda console settings |
| **Lambda Layer**                 | Automatically added |
| **Environment Variables**        | Automatically set |
| **IAM Permissions**              | `AmazonCodeGuruProfilerAgentAccess` policy must be attached to the function's IAM role |

---

# **Summary**

- **Amazon CodeGuru Profiler** gives deep insights into Lambda **runtime performance**.
- Activation is **simple** and **automated** via the Lambda console.
- Behind the scenes, a **layer**, **environment variables**, and **IAM permissions** are configured to enable seamless profiling.