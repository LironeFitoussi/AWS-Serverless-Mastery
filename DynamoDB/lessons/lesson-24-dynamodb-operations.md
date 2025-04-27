# **DynamoDB Table Operations: Cleanup and Copying**

In this short lecture, we explore **two important DynamoDB operations**: **cleaning up tables** and **copying tables across accounts or regions**. Understanding these options is crucial for efficient database management and exam preparation.

---

## **DynamoDB Table Cleanup**

When you need to clear a DynamoDB table, you have two main approaches:

### **1. Scan and Delete Items (Not Recommended)**
- **Process:**  
  - Perform a full **Scan** on the table.
  - **Delete** each item individually.
- **Drawbacks:**  
  - **Very slow.**
  - **Expensive** in terms of **RCUs** (Read Capacity Units) for the scan and **WCUs** (Write Capacity Units) for the deletes.

### **2. Drop and Recreate the Table (Recommended)**
- **Process:**  
  - **Drop** (delete) the existing table entirely.
  - **Recreate** the table with the original settings.
- **Advantages:**  
  - **Fast**, **efficient**, and **cost-effective**.
- **Important:**  
  - Ensure you **recreate** the table **accurately** with the correct schema and configuration.

---

## **Copying DynamoDB Tables Across Accounts or Regions**

When moving a table between different **AWS accounts** or **regions**, there are three strategies:

### **1. AWS Data Pipeline (Less Preferred)**
- **How it Works:**  
  - AWS Data Pipeline launches an **EMR cluster**.
  - The EMR cluster **scans** the source DynamoDB table and **writes** the data to **Amazon S3**.
  - It then **reads** from S3 and **inserts** the data into a new DynamoDB table.
- **Note:**  
  - This is a **rarely used** method, primarily seen in exam scenarios.
  - It **requires** external services like **EMR** and **S3**.

### **2. Backup and Restore (Recommended)**
- **How it Works:**  
  - Perform a **Backup** of the original table.
  - **Restore** it into a new table in the target account or region.
- **Advantages:**  
  - **More efficient**.
  - **No need** for external services like EMR or Data Pipeline.

### **3. Manual Scan and Write (Custom Approach)**
- **How it Works:**  
  - Perform a **Scan** operation programmatically.
  - Use **PutItem** or **BatchWriteItem** APIs to insert data into the new table.
- **Advantages:**  
  - Opportunity to **transform** data during migration.
- **Drawbacks:**  
  - Requires **custom coding**.
  - **Not recommended** unless necessary.

---

## **Summary**

- For **table cleanup**, **drop and recreate** the table whenever possible.
- For **copying tables**, **backup and restore** is the most **efficient** and **simpler** method.
- Use **Data Pipeline** or **manual methods** only when specific needs arise.