# **Understanding DynamoDB Write Sharding**

## **The Problem: Hot Partitions**
In certain use cases like a **voting application**, users may vote for only a **few candidates** (e.g., Candidate A and Candidate B).

- **Partition Key**: Candidate ID.
- **Issue**: All writes for Candidate A and Candidate B are **concentrated on only two partitions**.
- **Consequence**:  
  - **Write throttling** due to overwhelming a few partitions.
  - **Read hotspots** affecting performance and scalability.

This situation is known as a **hot partition issue**.

---

## **The Solution: Write Sharding**
To **distribute the load more evenly** across DynamoDB partitions, we use **Write Sharding**.

### **How Write Sharding Works**
- **Modify the Partition Key** by adding a **suffix** or **prefix**.
- This transforms keys like:
  - `candidateA` ➔ `candidateA#11`
  - `candidateB` ➔ `candidateB#17`
  - `candidateB` ➔ `candidateB#18`
  - `candidateA` ➔ `candidateA#20`

✅ This introduces **more unique partition key values**, improving data distribution and eliminating hot partitions.

---

## **Methods to Create Suffixes/Prefixes**

| Method            | Description                                           |
|-------------------|--------------------------------------------------------|
| **Random Suffix**  | Append a random number or character to the partition key (e.g., `candidateA#15`). |
| **Hashed Suffix**  | Use a **hashing algorithm** (e.g., MD5, SHA-256) on a field to generate a deterministic suffix. |

Both strategies help **spread writes and reads** evenly across multiple partitions.

---

# **Key Takeaways**
- **Write Sharding** prevents **hot partition** issues by improving key distribution.
- You can use **randomization** or **hashing** to create diversified keys.
- This strategy is crucial for **high-write** or **high-read** DynamoDB workloads, especially when working with **limited key options**.

---

# **Summary**
When building scalable, highly available applications on DynamoDB — like a voting app — implementing **Write Sharding** is essential to maintain **performance** and **avoid throttling** due to **hot partitions**.