# **Hands-On: Enabling and Using DynamoDB Streams with AWS Lambda**

## **Step 1: Enable DynamoDB Streams**
To enable **DynamoDB Streams** for your table:

1. Navigate to your **UsersPost** table.
2. Go to **Exports and Streams**.
3. Under **DynamoDB Stream Details**, click **Enable**.
4. Choose the stream view type:
   - **Keys Only**
   - **NEW_IMAGE**
   - **OLD_IMAGE**
   - **NEW_AND_OLD_IMAGES** (Selected to capture maximum information.)

Once enabled, your table now streams data changes.

---

## **Step 2: Set Up a Lambda Function to Process Stream Events**

### **Create the Lambda Function**
- Create a **new Lambda function** using a **blueprint**.
- Search for **"DynamoDB"** and select **DynamoDB process stream (Python)**.
- Name the function, for example: **LambdaDemoDynamoDBStream**.
- Create a new IAM role with **basic Lambda permissions**.

### **Assign Proper IAM Permissions**
- Navigate to the function's **Configuration > Permissions**.
- Click the **execution role**.
- Attach the following policies:
  - **AWSLambdaDynamoDBExecutionRole** (preferred for Lambda + DynamoDB integration).
  - **AmazonDynamoDBReadOnlyAccess** (optional, but ensures read capabilities).

> ⚡ **Important**: Without these permissions, the Lambda cannot read from the DynamoDB Stream.

---

## **Step 3: Configure the Trigger**

- Create a new **trigger** for the Lambda function:
  - **Source Table**: UsersPost.
  - **Batch Size**: 100 (controls how many records are passed per batch).
  - **Starting Position**: Choose **LATEST** to start processing only new updates.
- **Enable** the trigger.

Now, DynamoDB Stream events will automatically invoke your Lambda function!

---

## **Step 4: Test the Integration**

### **Perform Operations on the Table**
- **Update**: Edit an existing item (e.g., modify the content of John’s second post).
- **Insert**: Duplicate an item to create a new post for Alice.
- **Delete**: Delete the newly created Alice blog post.

Each action (Update, Insert, Delete) should trigger an event.

### **View the Results in CloudWatch Logs**
- Navigate to **CloudWatch Logs**.
- Locate your function’s log group.
- Check the logs:
  - **MODIFY Event**: Shows the updated item with both the **new** and **old images**.
  - **INSERT Event**: Displays only the **new image** (no old image exists).
  - **REMOVE Event**: Displays only the **old image** (item was deleted).

Each event logs important attributes like `user_id`, `post_content`, and operation type.

---

## **Step 5: Clean Up**

- After verifying, **disable or delete the trigger** from the DynamoDB table settings to avoid unnecessary charges and background executions.

---

# **Summary**
In this hands-on session, you:
- **Enabled DynamoDB Streams** with full item information.
- **Created and configured a Lambda function** to process stream events.
- **Logged real-time database operations** (Insert, Update, Delete) into **CloudWatch Logs**.
- **Learned** the importance of permissions, triggers, and batch settings.

This forms the **foundation for integrating DynamoDB Streams with serverless workflows**, opening doors for advanced event-driven architectures.
