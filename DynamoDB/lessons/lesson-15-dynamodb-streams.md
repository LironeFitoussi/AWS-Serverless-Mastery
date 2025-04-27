# **Understanding DynamoDB Streams**

## **What are DynamoDB Streams?**
**DynamoDB Streams** are an **ordered list of item-level modifications** — such as **create**, **update**, and **delete** — happening within a DynamoDB table. Each modification event becomes visible in the stream, providing a sequential view of changes over time.

---

## **How DynamoDB Streams Work**
- **Modifications Captured**: Any **insert**, **update**, or **delete** operation triggers an event.
- **Stream Retention**: Stream data is retained for **up to 24 hours**.
- **Persistence Options**:
  - Push into **Kinesis Data Streams** for extended storage and processing.
  - Use **AWS Lambda** functions or **Kinesis Client Library (KCL)** applications to consume and persist the data elsewhere.

---

## **Use Cases for DynamoDB Streams**
- **Real-Time Reactions**: Trigger workflows like **sending welcome emails** or **notifications**.
- **Analytics Pipelines**: Stream changes into **Amazon Redshift** or **Amazon S3** for analysis and archival.
- **Search Capabilities**: Push data into **Amazon OpenSearch Service** for search functionality.
- **Data Transformation**: Create **derivative tables** or **filtered datasets**.
- **Global Tables**: **Cross-region replication** requires DynamoDB Streams.

---

## **Architecture Overview**

**Operations Flow**:
1. Application performs **create**, **update**, or **delete** on a table.
2. Changes appear in a **DynamoDB Stream**.
3. Possible Destinations:
   - **Kinesis Data Streams** ➔ **Kinesis Data Firehose** ➔ **Amazon Redshift**, **Amazon S3**, or **OpenSearch**.
   - **Custom Processing Layer**: 
     - **Lambda functions**.
     - **KCL Applications** running on **EC2**.

**Advantages**:
- **Fully managed** by AWS.
- **Custom processing** and logic easily added using **Lambda** or **KCL**.
- **Messaging & Notifications**: Integration with **Amazon SNS**.
- **Data Filtering & Transformation**: Modify and reinsert data into DynamoDB or other systems.

---

## **Stream Record Content Options**
When configuring a DynamoDB Stream, you can choose the type of data to capture:
- **Keys Only**: Only key attributes that were modified.
- **NEW_IMAGE**: New item state **after modification**.
- **OLD_IMAGE**: Original item state **before modification**.
- **NEW_AND_OLD_IMAGES**: Full snapshot of **before and after** item states.

---

## **Sharding and Scaling**
- DynamoDB Streams are **sharded**, similar to **Kinesis Data Streams**.
- **No manual provisioning** of shards — **AWS automatically manages** the scaling.
- **Kinesis Client Library (KCL)** works seamlessly with DynamoDB Streams.

---

## **Important Note**
- **Streams are not retroactive**: Changes are captured **only after** the stream is enabled. Historical modifications before enabling are **not included**.

---

## **Integrating DynamoDB Streams with AWS Lambda**

**Steps**:
1. Create an **Event Source Mapping** between the **DynamoDB Stream** and your **Lambda function**.
2. Ensure the **Lambda function** has proper **permissions** to poll the stream.
3. **Synchronous Invocation**: The Event Source Mapping pulls records in **batches** and **invokes the Lambda** with these records.

**Example Workflow**:
- Table updates ➔ Appear in DynamoDB Stream ➔ Pulled by Event Source Mapping ➔ Lambda processes the batch of records.

---

# **Summary**
**DynamoDB Streams** unlock powerful, **real-time processing**, **analytics**, and **search capabilities** for your applications. Combined with AWS services like **Kinesis**, **Lambda**, and **OpenSearch**, they offer a fully managed way to react to data changes and build scalable architectures effortlessly.
