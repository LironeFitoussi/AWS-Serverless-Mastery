# **Mastering DynamoDB API Operations: Read, Write, Delete, and PartiQL**

When preparing for the AWS exam or working with DynamoDB in real-world projects, it's crucial to understand the **main API operations** by their exact names.  
Here's a complete guide to DynamoDB's key operations and concepts you need to know:

---

# **Writing Data to DynamoDB**

## **1. PutItem**
- **Purpose**: Create a new item **or** **replace** an existing item (with the same Primary Key).
- **Consumes**: Write Capacity Units (WCU).
- **Behavior**: Full item replacement.

## **2. UpdateItem**
- **Purpose**: **Modify specific attributes** of an existing item, or **create** a new item if it doesn’t exist.
- **Use Cases**: Partial updates, support for **atomic counters**.
- **Difference from PutItem**: UpdateItem changes only specified attributes, not the entire item.

## **3. Conditional Writes**
- **Purpose**: Execute **Put**, **Update**, or **Delete** only if a specified condition is met.
- **Helps with**: Handling concurrent updates safely.

---

# **Reading Data from DynamoDB**

## **1. GetItem**
- **Purpose**: Retrieve a single item using its **Primary Key** (Partition Key or Partition Key + Sort Key).
- **Read Modes**:
  - **Eventually Consistent Read** (default): Faster, uses fewer RCUs.
  - **Strongly Consistent Read** (optional): More reliable, slightly higher RCU and latency.
- **Optimization**: Use **ProjectionExpression** to retrieve only specific attributes.

## **2. Query**
- **Purpose**: Retrieve multiple items **based on a Partition Key**, with optional Sort Key conditions.
- **Key Condition Expression**:
  - Partition Key: Must use **equals** (`=`).
  - Sort Key: Can use operators like `=`, `<`, `>`, `begins_with`, `between`.
- **FilterExpression**:
  - Further filter results based on non-key attributes (after the query).
- **Limits**:
  - Returns up to **1 MB** of data or the specified **Limit**.
  - Supports **pagination** for large datasets.
- **Targets**:
  - Query a **Table**, **Local Secondary Index (LSI)**, or **Global Secondary Index (GSI)**.

## **3. Scan**
- **Purpose**: Read the **entire table** or index.
- **Considerations**:
  - **Inefficient**: Reads all items even if you only need a few.
  - **Consumes** lots of RCUs.
  - Supports **ProjectionExpression** and **FilterExpression**.
  - Supports **pagination** (1 MB limit per scan page).
- **Parallel Scan**:
  - Multiple workers scan different segments simultaneously to improve performance.
  - **Higher RCU usage** but faster.

---

# **Deleting Data from DynamoDB**

## **1. DeleteItem**
- **Purpose**: Delete a single item based on its Primary Key.
- **Supports**: Conditional deletes (e.g., delete only if a condition like `money = 0` is met).

## **2. DeleteTable**
- **Purpose**: **Delete the entire table** and all its items.
- **Efficiency Tip**: Much faster and cheaper than scanning and individually deleting items.

---

# **Batch Operations for Efficiency**

Batch operations allow you to group multiple API calls together, reducing network overhead and improving performance.

## **1. BatchWriteItem**
- **Purpose**: Perform up to **25 PutItem** and/or **DeleteItem** requests in one batch.
- **Limits**:
  - Up to **16 MB** of data total.
  - Maximum **400 KB per item**.
- **Important**:
  - No UpdateItem support.
  - Failed operations are returned as **UnprocessedItems**.
  - Retry using **exponential backoff** or **increase WCU**.

## **2. BatchGetItem**
- **Purpose**: Retrieve multiple items from one or more tables.
- **Limits**:
  - Up to **100 items** and **16 MB** of data.
- **Handling Failures**:
  - UnprocessedKeys are returned; retry with exponential backoff or increase RCU.

---

# **Using PartiQL for SQL-like Queries**

## **What is PartiQL?**
- PartiQL allows you to use **SQL syntax** to interact with DynamoDB.
- Supports **SELECT**, **INSERT**, **UPDATE**, and **DELETE**.
- **No support for JOINs**.

## **Where can you run PartiQL?**
- AWS Management Console.
- NoSQL Workbench for DynamoDB.
- AWS CLI, SDKs, and APIs.

## **Why use PartiQL?**
- **Ease of use**: Familiar SQL-like language.
- **Same capabilities**: Behind the scenes, PartiQL maps to standard DynamoDB API calls.

✅ **Important**: PartiQL doesn't add new features; it simplifies how you express operations.

---

# **Summary Table**

| Operation        | Purpose                               | Key Notes |
|------------------|---------------------------------------|-----------|
| PutItem          | Create or replace item                | Full item replacement |
| UpdateItem       | Edit attributes or create if missing  | Partial updates |
| GetItem          | Retrieve one item by Primary Key      | Optional strong consistency |
| Query            | Find multiple items by Partition Key  | Supports sort key conditions |
| Scan             | Read the entire table                 | Expensive, paginated |
| DeleteItem       | Delete one item                       | Can use conditions |
| DeleteTable      | Delete entire table                   | Fast and efficient |
| BatchWriteItem   | Multiple writes or deletes            | Retry UnprocessedItems |
| BatchGetItem     | Multiple gets                         | Retry UnprocessedKeys |
| PartiQL          | SQL for DynamoDB                      | No joins |

---

# **Next Steps**

Now that you know the main operations in DynamoDB, the next section will dive deeper into **Indexes (LSI and GSI)**, **advanced queries**, and **real-world optimization strategies**!

🎯 **Coming Up**: Fine-tuning DynamoDB for complex queries and scaling efficiently!
