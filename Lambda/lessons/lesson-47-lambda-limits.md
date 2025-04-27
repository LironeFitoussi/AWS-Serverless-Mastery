# **Using Amazon CodeGuru Profiler with AWS Lambda**

Amazon **CodeGuru Profiler** integrates seamlessly with **AWS Lambda** to provide **runtime performance insights**. This helps developers optimize their Lambda functions by identifying bottlenecks and improving efficiency.

## **Overview of Lambda and CodeGuru Profiler Integration**

- **Purpose**:
  - Gain **performance insights** into running Lambda functions.
  - Identify **inefficiencies** and **optimize** code execution.

- **Supported Runtimes**:
  - **Java**
  - **Python**

---

## **How to Enable CodeGuru Profiler for Lambda**

1. **Activate from Lambda Console**:
   - Simple activation through the AWS Management Console.
   - No manual code modification required.

2. **Profiler Group Creation**:
   - When activated, CodeGuru automatically creates a **Profiler Group** linked to your Lambda function.

3. **Automatic Changes After Activation**:
   - **Lambda Layer Added**:
     - A **CodeGuru Profiler Layer** is attached to your function.
     - This layer collects runtime profiling data.
   - **Environment Variables Set**:
     - Environment variables specific to CodeGuru are automatically injected into the Lambda configuration.
   - **IAM Permissions Updated**:
     - Your Lambda execution role must include the **AmazonCodeGuruProfilerAgentAccess** managed policy.
     - This permission enables the profiler to submit collected data securely.

---

## **Key Components Involved**

| Component                       | Purpose |
|----------------------------------|---------|
| **Profiler Group**               | Logical grouping to collect and analyze profiling data. |
| **Lambda Layer**                 | CodeGuru agent instrumentation added automatically. |
| **Environment Variables**        | Configuration settings for the profiler agent. |
| **IAM Policy**                   | `AmazonCodeGuruProfilerAgentAccess` policy grants necessary permissions. |

---

# **Summary**

- **Amazon CodeGuru Profiler** provides valuable **runtime performance profiling** for Java and Python Lambda functions.
- Activation is **quick** and **automated** through the **Lambda console**.
- **Profiler layers**, **environment variables**, and **IAM roles** are automatically managed to ensure proper data collection.