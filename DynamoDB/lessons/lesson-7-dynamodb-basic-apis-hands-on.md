# **DynamoDB Data Operations: Practical Walkthrough**

In this lesson, we explored **hands-on usage** of DynamoDB's core **data APIs** directly from the AWS Management Console.  
Let's summarize the essential operations and how they behave behind the scenes:

---

# **Exploring DynamoDB API Calls in Action**

## **1. Scan Operation**
- **Purpose**: Retrieve **all items** from a table.
- **How**:
  - Select your table.
  - Click **Run** under the **Scan** tab.
- **Note**:
  - Scan reads **every item** in the table.
  - You can **apply filters**, but these filters happen **client-side** (in the browser), **not** on the server.
  - Scan operations are **inefficient** for large tables due to full table read.

---

## **2. PutItem Operation (Creating Items)**

- **Example**:
  - Create a new item with:
    - `user_ID`: `Alice456`
    - `post_TS`: `2021-05-06T00:00:00Z`
    - `content`: `"Alice blog"`
- **Behavior**:
  - If the combination of Partition Key and Sort Key is new, DynamoDB **inserts the item**.
- **Behind the scenes**:  
  ✅ This action triggers a **PutItem API** call.

---

## **3. UpdateItem Operation (Editing Items)**

- **How**:
  - Click on an existing item.
  - Choose **Actions → Edit**.
  - Modify specific attributes (e.g., update the `content` field to `"Alice blog edited"`).
- **Behavior**:
  - Only **specific fields** are modified, not the entire item.
- **Behind the scenes**:  
  ✅ This action triggers an **UpdateItem API** call.

---

## **4. GetItem Operation (Reading Individual Items)**

- **How**:
  - Click on an item in the table.
  - View it using the **Item Editor**.
- **Behavior**:
  - Retrieves the item based on its **Partition Key** (and optional Sort Key).
- **Behind the scenes**:  
  ✅ This triggers a **GetItem API** call.

---

## **5. BatchWriteItem Operation (Batch Deletes)**

- **How**:
  - Select multiple items → **Actions → Delete Items**.
- **Behavior**:
  - Deletes several items at once.
- **Behind the scenes**:  
  ✅ This triggers a **BatchWriteItem API** call (specifically **batch delete**).

---

# **Efficient Deletion Reminder**

- **Inefficient**: Scanning the table and batch deleting every item.
- **Efficient**: Simply use the **DeleteTable** operation to remove **all items** and the table structure instantly.

---

# **Comparing Scan and Query**

| Feature | Scan | Query |
|:--------|:-----|:------|
| **Purpose** | Read all items in a table | Read items based on a Partition Key (and optional Sort Key conditions) |
| **Efficiency** | Low (full table read) | High (targeted retrieval) |
| **Filtering** | Client-side | Server-side (on key attributes) |
| **Usage** | Table export, infrequent tasks | Most production queries |

---

## **6. Query Operation (Targeted Retrieval)**

- **How**:
  - Switch to the **Query** tab.
  - Specify a **Partition Key** (e.g., `John123`).
  - Optionally apply **Sort Key conditions**:
    - **Equal to**
    - **Less than / Greater than**
    - **Begins With**
    - **Between**
- **Example**:
  - Query posts **after** `2021-11`.
  - Retrieve only posts matching those conditions.

✅ **Key Tip**:  
- Queries **must** start with a **Partition Key condition**.
- Sort Key conditions are **optional** but very powerful for filtering within a Partition Key group.

> 🚫 **Limitation**: You **cannot query** non-key attributes (like `content`) directly; filtering them can only happen **client-side** after data retrieval.

---

# **Summary**

In this hands-on session, you learned:
- How DynamoDB maps UI actions to core API operations.
- The difference between **PutItem**, **UpdateItem**, **GetItem**, **BatchWriteItem**, **Query**, and **Scan**.
- Best practices for **efficient querying and deletion** in DynamoDB.
- The critical role of **Partition Keys** and **Sort Keys** in building scalable, performant databases.

---

# **Coming Up Next**

You are now ready to dive deeper into **Secondary Indexes** and **Advanced Query Techniques** with DynamoDB!  
🎯 Get ready to expand your knowledge and master even more complex use cases.