# **Understanding Indexes in DynamoDB: LSI and GSI**

To build **efficient and scalable** applications with **DynamoDB**, it's essential to understand how **indexes** work.  
Indexes allow you to **query data using different access patterns** without scanning the entire table.

There are two key types of indexes you must know for the AWS exam and for real-world design:

---

# **1. Local Secondary Index (LSI)**

## **Key Concepts:**
- **Purpose**: Provides an **alternative sort key** for queries.
- **Partition Key**: **Same** as the base table.
- **Sort Key**: **Different** from the base table’s sort key.
- **Data Types**: Sort key can be a **string**, **number**, or **binary**.
- **Limit**: Up to **5 LSIs per table**.
- **Definition Time**: Must be created **when the table is created** (cannot add later).

## **Attributes Projection:**
- You can project **some or all attributes** from the base table onto the LSI, depending on your query needs.

## **Example Scenario:**

| Attribute         | Description |
|:------------------|:------------|
| `user_ID` (Partition Key) | User's ID |
| `game_ID` (Sort Key) | Game's ID |
| `game_timestamp` | Time when the game was played |
| `score` | Score of the game |
| `result` | Win/Loss |

- Without LSI: Can only query `user_ID` + `game_ID`.
- **Problem**: Can't query `user_ID` + `game_timestamp` without scanning.
- **Solution**:  
  - Create an **LSI** with `user_ID` as partition key and `game_timestamp` as sort key.
  - Enables efficient queries like **"all games played by a user between two dates."**

---

# **2. Global Secondary Index (GSI)**

## **Key Concepts:**
- **Purpose**: Provides a **completely different primary key** for querying.
- **Partition Key and Sort Key**: Can both differ from the base table’s keys.
- **Data Types**: Can be **string**, **number**, or **binary**.
- **Definition Time**:  
  - **Can be created at any time** (even after table creation).

## **Attributes Projection:**
- Choose which attributes to **project** to the GSI to reduce storage and improve performance.

## **Capacity Planning:**
- GSIs require **separate provisioning** of **RCUs** (Read Capacity Units) and **WCUs** (Write Capacity Units).

## **Example Scenario:**

| Attribute         | Description |
|:------------------|:------------|
| `user_ID` (Partition Key) | User's ID |
| `game_ID` | Game's ID |
| `game_timestamp` | Time when the game was played |

- Problem: You want to query by `game_ID` instead of `user_ID`.
- **Solution**:
  - Create a **GSI** with:
    - **Partition Key**: `game_ID`
    - **Sort Key**: `game_timestamp`
    - **Projected Attributes**: `user_ID`
  - Now, you can easily query "find all games by game ID."

---

# **Important Differences Between LSI and GSI**

| Feature | Local Secondary Index (LSI) | Global Secondary Index (GSI) |
|:--------|:-----------------------------|:-----------------------------|
| **Partition Key** | Same as base table | Can differ from base table |
| **Sort Key** | Different | Optional (can have or not) |
| **Creation Time** | At table creation only | Any time (after table creation too) |
| **Capacity Units** | Shares base table’s RCUs and WCUs | Requires independent RCUs and WCUs |
| **Throttling Impact** | No special impact | Throttling on GSI **can throttle the main table** |
| **Max per Table** | 5 LSIs | 20 GSIs (soft limit, can be raised) |

---

# **Throttling Considerations**

- **GSI**:  
  - If a GSI is **throttled** due to insufficient write capacity, the **main table** will also be **throttled**.
  - ⚡ Always plan **provisioned capacities** carefully for GSIs.
  
- **LSI**:  
  - Uses the base table’s capacity units.
  - No special throttling risks specific to the LSI.

---

# **Summary**

✅ **Local Secondary Index (LSI)**:  
- Same partition key, different sort key.
- Must be created with the table.

✅ **Global Secondary Index (GSI)**:  
- Different partition/sort keys allowed.
- Can be created anytime and scales separately.

✅ **Design Tips**:
- Plan indexes carefully based on your **query patterns**.
- Always monitor and manage **capacity units** properly for GSIs.

---

# **Coming Up Next**

Get ready! Next, we'll dive deeper into **how to design access patterns using indexes** and **optimize your table structure** for real-world, scalable applications.