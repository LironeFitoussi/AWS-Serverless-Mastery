# **AWS Lambda Storage Options: File System Mounting and Comparisons**

## **Mounting EFS to Lambda**

AWS **Lambda functions** can access an **EFS (Elastic File System)** if they are running within a **VPC**.  
Here's how it works:

- Configure **Lambda** to **mount the EFS** to a **local directory** during initialization.
- **EFS Access Points** must be used to allow this connection.
- Your **Lambda functions** need to be deployed in a **private subnet** with **private connectivity** into the **VPC**.

> **Important:**  
Each **Lambda instance** creates a **new connection** to the **EFS**. Be mindful of:
- **EFS Connection Limits**: Too many concurrent Lambdas can exhaust available connections.
- **Connection Burst Limits**: Sudden spikes in Lambda instances can overwhelm EFS.

---

## **Comparing Lambda Storage Options**

### **1. Ephemeral Storage (/tmp)**

- **Max Size:** 10 GB
- **Persistence:** **Ephemeral** (data lost when the Lambda instance ends)
- **Content:** **Dynamic** (modifiable)
- **Storage Type:** File system operations supported
- **Pricing:**  
  - Free up to **512 MB**  
  - Pay for additional usage beyond 512 MB
- **Access:**  
  - Available only to **that specific function**  
  - **Not shared** across invocations
- **Performance:**  
  - **Fastest** storage option

---

### **2. Lambda Layers**

- **Max Size:** 5 layers per function, total size up to **250 MB**
- **Persistence:** **Durable** (immutable after deployment)
- **Content:** **Static** (cannot modify)
- **Storage Type:** Archive
- **Pricing:** Included in Lambda pricing
- **Access:**  
  - Requires proper **IAM permissions**
  - **Shared** across all Lambda invocations
- **Performance:**  
  - **Very fast** as they are attached directly to Lambda

---

### **3. Amazon S3**

- **Max Size:** Virtually unlimited
- **Persistence:** **Durable**
- **Content:** **Dynamic** (modifiable)
- **Storage Type:** Object storage (must use S3 APIs)
- **Operations:** Atomic (GET, PUT, POST, etc.)
- **Pricing:**  
  - Pay for storage, requests, and data transfer
- **Access:**  
  - Requires proper **IAM permissions**
  - **Shared** across all invocations
- **Performance:**  
  - **Fast**, but not the fastest (network-based)

---

### **4. Amazon EFS**

- **Max Size:** Elastic (scales automatically)
- **Persistence:** **Durable**
- **Content:** **Dynamic**
- **Storage Type:** File system operations supported
- **Pricing:**  
  - Pay for storage, data transfer, and throughput
- **Access:**  
  - Network-mounted file system
  - **Shared** across all invocations
- **Performance:**  
  - **Very fast** due to network mounting

---

## **Summary**

| Storage Option  | Max Size | Persistence | Content Type | Access Type | Speed | Shared Across Invocations |
|:----------------|:---------|:------------|:-------------|:------------|:------|:--------------------------|
| /tmp (Ephemeral) | 10 GB | Ephemeral | Dynamic | Function-only | Fastest | No |
| Lambda Layers   | 250 MB | Durable (Immutable) | Static | IAM-controlled | Very Fast | Yes |
| Amazon S3       | Unlimited | Durable | Dynamic | IAM-controlled (API access) | Fast | Yes |
| Amazon EFS      | Elastic | Durable | Dynamic | Mounted file system | Very Fast | Yes |

