# **Creating and Using Indexes in DynamoDB: Hands-On Guide**

In this lesson, we explored how to create and query both **Local Secondary Indexes (LSI)** and **Global Secondary Indexes (GSI)** in **DynamoDB**.  
This is a crucial skill to efficiently retrieve data based on different access patterns.

---

# **Creating a DynamoDB Table with an LSI**

## **Step-by-Step Setup:**

1. **Create a New Table**:
   - Table name: **`demo_indexes`**
   - **Partition Key**: `user_id`
   - **Sort Key**: `game_timestamp`

2. **Customize Settings**:
   - **Provisioned Capacity Mode**:
     - **RCUs**: 1  
     - **WCUs**: 1

3. **Add a Local Secondary Index (LSI)**:
   - **Partition Key**: (same) `user_id`
   - **Sort Key**: **`game_id`**
   - **Index Name**: `game_id_index`
   - **Projection**: `All` attributes

✅ **Important**:  
- LSIs **must** be defined **at table creation time**.
- **Cannot add LSIs after** the table is created.

---

# **Querying the Table with LSI**

Once the table is created:

- **Query Options**:
  - **Query the Base Table**:
    - By `user_id` **and** `game_timestamp`.
  - **Query the LSI**:
    - By `user_id` **and** `game_id`.

> 🔥 **Advantage**: LSIs allow flexible query patterns by changing the sort key while maintaining the same partition key.

---

# **Adding a Global Secondary Index (GSI)**

## **How to Create a GSI:**

- GSIs **can be added anytime** after table creation.
- Example setup:
  - **Partition Key**: `game_id`
  - **Sort Key**: `game_timestamp`
  - **Index Name**: `game_id-game_timestamp-index`

## **Provisioning for GSI**:

- **Independent RCUs and WCUs**:
  - Copy from the base table (1 RCU and 1 WCU) or customize separately.
- **Projection**:
  - Choose `All`, `Keys Only`, or `Include` specific attributes.

✅ **Important**:  
- GSIs **do not share** the base table’s provisioned capacity.
- If a GSI gets **throttled**, it will **throttle the main table's write operations too**!

---

# **Querying the Table with GSI**

After the GSI is created:

- **Query Options**:
  - **Query by** `game_id` (Partition Key) **and** `game_timestamp` (Sort Key).

✅ **Advantage**:  
- GSIs allow **completely different access patterns**, enabling you to query based on **new attributes** not originally in your main table’s key schema.

---

# **Key Differences: LSI vs GSI**

| Feature | Local Secondary Index (LSI) | Global Secondary Index (GSI) |
|:--------|:-----------------------------|:-----------------------------|
| **Partition Key** | Same as base table | Different from base table |
| **Sort Key** | Different | Optional |
| **Creation Time** | Only during table creation | Anytime (even after) |
| **Capacity Usage** | Shares base table’s RCUs and WCUs | Independent RCUs and WCUs |
| **Throttling Impact** | No special issues | Throttling on GSI impacts base table |

---

# **Best Practices Highlighted**

- **Plan your indexes carefully**:
  - LSIs must be designed **before table creation**.
  - GSIs offer **flexibility** but require **careful capacity planning**.
- **Use LSIs** when you need alternative sorting of the same partition key.
- **Use GSIs** when you need alternative partition and/or sort keys for different query patterns.

---

# **Summary**

Through this exercise, you learned:
- How to define LSIs and GSIs in DynamoDB.
- How to query efficiently using indexes.
- How capacity and throttling work differently between LSIs and GSIs.

✅ **Mastering indexes** is crucial for building highly scalable and efficient DynamoDB applications!

---

# **Coming Up Next**

Next, we'll dive deeper into **designing real-world data models using indexes**, exploring **best practices for query optimization**, and **understanding access patterns** for maximum efficiency!