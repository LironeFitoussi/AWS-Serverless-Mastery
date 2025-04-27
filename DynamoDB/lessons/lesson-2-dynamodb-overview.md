# **Introduction to DynamoDB: A Serverless NoSQL Database**

In traditional architectures, data storage often relies on **relational databases** like **Amazon RDS**, using technologies such as **MySQL** or **PostgreSQL**. These databases leverage the **SQL query language**, offer **schema enforcement**, and support complex operations like **joins** and **aggregations**. However, they primarily scale **vertically**—meaning to handle more load, you must upgrade your hardware (CPU, RAM, or disk I/O).  
**Horizontal scaling** in RDS is limited, mainly adding **read replicas** but **no support for write scaling** across multiple nodes.

To address scalability challenges, **NoSQL databases** emerge as a strong alternative.

## **What is NoSQL?**

- **NoSQL** stands for "Not Only SQL" or "Non-SQL."
- These are **non-relational databases** that prioritize **horizontal scalability**.
- Examples include **MongoDB** and **DynamoDB**.
- Key differences:
  - **No joins**: Data must often be self-contained within a single item.
  - **Limited aggregation**: Functions like **SUM** or **AVG** are minimal or absent.
  - **Horizontal scaling**: More nodes mean more capacity for reads and writes.

NoSQL databases aren't "better" or "worse" than SQL—they are **optimized for different use cases** based on data modeling, query patterns, and scaling requirements.

---

# **Deep Dive into DynamoDB**

## **Key Features of DynamoDB:**

- **Fully managed NoSQL database** by AWS.
- **Highly available**, with **multi-AZ replication**.
- **Massive scalability**:
  - Supports **millions of requests per second**.
  - Handles **trillions of rows** and **hundreds of terabytes** of storage.
- **Fast and consistent performance** with **low latency** retrieval.
- **Integrated with IAM** for security and access control.
- **Event-driven architecture support** via **DynamoDB Streams**.
- **Cost-efficient** with **Auto Scaling**.
- Offers **Standard** and **Infrequent Access (IA)** table classes to optimize storage costs.

---

# **Fundamentals of DynamoDB Table Design**

## **Structure Overview:**

- **Tables**: The core resource that stores data.
- **Primary Key**: Mandatory; defines the uniqueness of each item.
- **Items** (Rows): Can be infinite in number.
- **Attributes** (Columns):
  - Can be added dynamically over time.
  - Attributes can be **optional** (null values are acceptable).
  - Can be **nested** using **Lists** and **Maps**.

> ⚡ **Important:** Each item in DynamoDB is limited to **400 KB** in size.

## **Supported Data Types:**

- **Scalar types**: String, Number, Binary, Boolean, Null.
- **Document types**: List, Map.
- **Set types**: String Set, Number Set, Binary Set.

---

# **Primary Key Design Strategies**

## **1. Partition Key (Hash Key Only)**

- A single attribute uniquely identifies each item.
- **Partition Key** must have **high cardinality** (many unique values) to ensure even data distribution.
- **Example**:
  - **Table**: Users
  - **Partition Key**: `user_id`
  - **Attributes**: `first_name`, `last_name`, `age`

✅ Good design ensures data distribution and scalability.

---

## **2. Partition Key + Sort Key (Hash + Range Key)**

- Items are grouped by the **Partition Key** and ordered by the **Sort Key**.
- The combination of Partition Key and Sort Key must be **unique**.

- **Example**:
  - **Table**: UserGames
  - **Partition Key**: `user_id`
  - **Sort Key**: `game_id`
  - **Attributes**: `score`, `result`

✅ This structure supports one-to-many relationships, such as one user participating in multiple games.

---

# **Best Practice: Choosing a Partition Key**

When designing a partition key:
- **Choose attributes with high cardinality** to avoid "hot partitions."
- **Avoid skew** where one value dominates (e.g., most movies in English).
- **Example Question**:  
  *For a movie database, which is the best partition key?*  
  - **Answer**: `movie_id` (high cardinality, unique per movie)

---

# **Next Steps**

You now have a foundational understanding of DynamoDB. In the next section, we will:
- Set up DynamoDB tables.
- Perform hands-on exercises.
- Explore best practices in table design, security, and performance optimization.

🚀 **Let's dive into practical work with DynamoDB!**
