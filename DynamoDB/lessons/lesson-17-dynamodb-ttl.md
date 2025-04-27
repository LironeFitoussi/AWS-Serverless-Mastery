# **Understanding and Implementing Time To Live (TTL) in DynamoDB**

## **What is Time To Live (TTL)?**
**Time To Live (TTL)** in **DynamoDB** allows you to **automatically delete expired items** from a table without consuming **write capacity units (WCU)**, meaning **no additional cost** for deletion operations.

- TTL requires a **numeric attribute** containing a **Unix Epoch timestamp**.
- When the **current time** surpasses the timestamp, the item is **marked for deletion**.
- **Deletion is asynchronous**: items may remain visible in reads, queries, and scans for **up to 40 hours** after expiry.
- Expired items are **also removed** from any **Local Secondary Indexes (LSIs)** and **Global Secondary Indexes (GSIs)**.
- **DynamoDB Streams** capture TTL deletions, meaning you can track or recover expired items if needed.

---

## **TTL Deletion Process Overview**
1. **Expiration Scan**: DynamoDB compares the current time to the TTL attribute value.
2. **Mark for Deletion**: Items with expired timestamps are flagged.
3. **Deletion**: Items are removed during a background scan and no longer appear in the table or indexes.

---

## **Common Use Cases for TTL**
- **Session Management**: Automatically remove old user sessions.
- **Regulatory Compliance**: Retain only recent or required data.
- **Data Lifecycle Management**: Reduce storage costs by removing outdated records.

---

# **Hands-On: Setting Up TTL in DynamoDB**

## **Step 1: Create the DynamoDB Table**
- Table Name: **DemoTTL**
- Partition Key: **user_id** (String)
- Provisioned capacity: **1 RCU** and **1 WCU** (Auto Scaling off).

---

## **Step 2: Insert Items with Expiration Timestamps**

Insert two items manually:

| user_id    | name  | expire_on (Epoch) |
|------------|-------|-------------------|
| john_123   | John  | 5 minutes from now |
| alice_456  | Alice | 1 hour from now    |

> Use an **Epoch converter** to generate timestamps based on the desired expiration time.

### Example:
- 5 minutes from now ➔ Epoch: `1682617200`
- 1 hour from now ➔ Epoch: `1682620800`

Ensure the **`expire_on`** attribute is **of type Number**, not String.

---

## **Step 3: Enable TTL on the Table**

1. Go to your table in the AWS Console.
2. Under **Additional Settings**, find **Time To Live**.
3. Click **Enable**.
4. Set the **TTL attribute name** to **expire_on**.
5. (Optional) **Preview Expiry**: You can simulate and preview which items will expire within custom future times (e.g., next 60 minutes, 24 hours).

Once enabled, **DynamoDB automatically deletes** expired items in the background.

---

## **Step 4: Monitor TTL Deletions**

- **CloudWatch Metrics**: 
  - View the number of items deleted in the last 24 hours.
  - Track the effectiveness of TTL-based cleanup.

- **DynamoDB Streams**:
  - Capture a **REMOVE** event for each expired item, which can be processed for further workflows.

---

# **Important Notes**
- **Expired but undeleted items** may still appear temporarily in query/scan results — use **client-side filtering** if necessary.
- **TTL deletions** do **not consume provisioned throughput**.
- **Streamed deletions** can be processed using **AWS Lambda** or **Kinesis** if additional handling is needed.

---

# **Summary**
With **TTL in DynamoDB**, you can **automate the lifecycle management** of your data, ensuring expired records are **cleaned up without extra cost**. It's a key feature for **session handling**, **temporary storage**, and **compliance-driven data policies**.