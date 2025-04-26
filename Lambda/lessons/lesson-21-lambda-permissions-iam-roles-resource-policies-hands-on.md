# Understanding Lambda Permissions: Execution Roles vs Resource-Based Policies

Let's review how **Lambda permissions** work by looking at real examples from the AWS Console.

---

## Lambda Functions Must Have an IAM Role

Every **Lambda function** must be assigned an **IAM Role**.  
This **execution role** allows Lambda to access AWS services on your behalf.

**Example:**
- Searching for `Lambda` in the IAM Console reveals multiple roles like:
  - `demo-Lambda-role`
  - `Lambda-ALB`
  - `Lambda-S3`
  - `Lambda-SQS`, etc.

---

## Example: The Basic Execution Role

The **demo-Lambda-role** has the **AWSLambdaBasicExecutionRole** policy attached.

**Policy Permissions:**
- **Create** CloudWatch log groups.
- **Send** log events to **CloudWatch Logs**.

> **Purpose:**  
> Enables the Lambda function to **log** execution details to **CloudWatch**.

---

## Resource-Based Policies on Lambda Functions

When another AWS service needs to **invoke your Lambda function**, a **resource-based policy** is required.

### Example: Lambda Triggered by S3
1. Open the **Lambda-S3** function.
2. Navigate to **Configuration → Permissions → Resource-based Policy**.
3. View Policy:
   - Allows the **Amazon S3** service to **invoke** this Lambda function.
   - Conditions specify:
     - The **Source Account** (AWS Account ID).
     - The **Source ARN** (S3 bucket ARN triggering Lambda).

### Example: Lambda Triggered by EventBridge
1. Open the **Lambda-EventBridge** function.
2. Check the **Resource-based Policy**.
3. View Policy:
   - Allows **events.amazonaws.com** (EventBridge) to **invoke** the Lambda function.
   - Specifies the **source ARN** as the EventBridge rule triggering the Lambda.

---

## Event Source Mapping: Lambda Reading from SQS

### Example: Lambda Polling SQS
1. Open the **Lambda-SQS** function.
2. Under **Configuration → Permissions**, observe:
   - **No resource-based policy** attached.

> **Why?**  
> - SQS **does not invoke** Lambda.
> - **Lambda polls** the SQS queue for messages.
> - Thus, the **execution role** must grant permissions to interact with SQS.

**Attached Policy: AWSLambdaSQSQueueExecutionRole**
- **ReceiveMessage**
- **DeleteMessage**
- **GetQueueAttributes**

> **Summary:**  
> - **Execution Role** is needed for **polling**.
> - **Resource Policy** is needed for **being invoked** by another AWS service.

---

## Key Differences: Resource-Based Policies vs Execution Roles

| **Feature** | **Execution Role** | **Resource-Based Policy** |
|:------------|:-------------------|:---------------------------|
| Lambda **reads** from AWS services (SQS, Kinesis) | ✅ Required | ❌ Not needed |
| AWS services **invoke** Lambda (S3, EventBridge) | ❌ Not sufficient | ✅ Required |

---

## Final Thoughts

- **Always attach an IAM execution role** to Lambda functions for accessing resources.
- **Use resource-based policies** when other AWS services **need to invoke** your Lambda.
- **Understand the trigger model**: whether Lambda **pulls** data or **gets invoked**.

---

## Coming Next

In the next section, we’ll continue exploring **advanced Lambda integrations** with AWS services!

---
