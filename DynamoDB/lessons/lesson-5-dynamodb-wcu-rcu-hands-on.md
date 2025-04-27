# **Hands-On with DynamoDB: Creating and Managing Tables**

After understanding the basics of DynamoDB, it's time to explore how the **DynamoDB service** works in practice. DynamoDB simplifies database management by offering a **serverless experience**, where we **create tables directly**—the underlying database infrastructure is fully managed by AWS.

---

# **Creating Your First DynamoDB Table**

## **Key Steps:**

1. **Create a Table**:
   - In DynamoDB, **you create tables**, not databases.
   - For example, create a table named **`Users`**.

2. **Define the Partition Key**:
   - **Partition Key**: `user_ID`
   - **Type**: `String` (can also be `Binary` or `Number`)

3. **Table Settings**:
   - **Table Class**:
     - **Standard**: General-purpose (recommended for most use cases).
     - **Standard-IA**: Optimized for infrequently accessed data (cost savings).
   - **Capacity Mode**:
     - **Provisioned**: Allows setting fixed read/write capacity (used within the free tier).
     - **On-Demand**: Auto-scales based on usage (discussed later).
   - **Provisioned Throughput**:
     - **2 Read Capacity Units** and **2 Write Capacity Units** (both within the free tier).
   - **Encryption**:
     - Default: **AWS-managed DynamoDB key**.

4. **Create the Table**:
   - Click **Create Table** after configuring the above.

---

# **Inserting Data into DynamoDB**

Once the table is ready:

## **Adding Items (Rows)**

- **Create Item** with a **`user_ID`** and other attributes:
  - Example:
    - `user_ID`: `John123`
    - `first_name`: `John`
    - `last_name`: `Doe`

- **Handling Missing Attributes**:
  - It's acceptable for items to have **different attributes**.
  - Example:
    - `user_ID`: `Alice456`
    - `first_name`: `Alice`
    - `age`: `41`
    - **Missing attributes** (like `last_name`) are fine.

✅ **Important**: In DynamoDB, **schema is flexible**. Each item can have a different set of attributes, and missing attributes are not an issue.

---

# **Primary Key Uniqueness**

- In a table with only a **Partition Key**:
  - Each **`user_ID`** must be **unique**.
  - Attempting to create another item with the same `user_ID` (e.g., `John123` again) will fail.

---

# **Creating a Table with Partition and Sort Key**

Let's create a second table: **`UserPosts`**.

## **Table Structure:**

- **Partition Key**: `user_ID`
- **Sort Key**: `post_TS` (timestamp)

> **Purpose**: Allow **multiple posts per user**, sorted by post timestamp.

## **Adding Posts**

Example Items:
- `user_ID`: `John123`
- `post_TS`: `2021-10-09T12:34:09Z`
- `content`: `"Hello world, this is my first blog!"`

- `user_ID`: `John123`
- `post_TS`: `2021-11-04T08:15:22Z`
- `content`: `"Second post yay!"`

✅ **Note**:  
- **Combination of `user_ID` and `post_TS` must be unique**.
- **Partition Key groups items** (e.g., all posts by `John123`).
- **Sort Key orders items** (e.g., by post date).

---

# **Best Practices Highlighted**

- **Partition Key selection is critical**:
  - Should have **high cardinality** to avoid "hot partitions."
  - Skewed data (e.g., one user with too many posts) can degrade performance.
- **Flexible schema**:
  - New attributes can be added without impacting existing items.
  - No enforced NULL constraints.

---

# **Summary**

Through this hands-on exercise, you learned how to:

- Create a DynamoDB table.
- Define a partition key and an optional sort key.
- Insert flexible, schema-less items.
- Understand the importance of unique primary keys.
- Recognize the value of partition and sort keys for modeling one-to-many relationships.

🚀 **Next Up**: More advanced features like **Secondary Indexes**, **Capacity Management**, and **Query Operations**!
