# AWS Lambda Execution Roles and Permissions

Now let's dive into the **theory** behind **Lambda execution roles and permissions** — a topic you've already practiced during hands-on labs!

---

## Why Execution Roles Matter

Every **Lambda function** must have an **IAM Role** attached to it.  
This **grants permissions** to the function so it can access **AWS services** and **resources** securely.

---

## Common AWS Managed Policies for Lambda

AWS provides **predefined managed policies** you can attach to Lambda execution roles:

| **Policy Name** | **Purpose** |
|:----------------|:------------|
| `AWSLambdaBasicExecutionRole` | Upload logs to **CloudWatch Logs** |
| `AWSLambdaKinesisExecutionRole` | Read from **Kinesis Streams** |
| `AWSLambdaDynamoDBExecutionRole` | Read from **DynamoDB Streams** |
| `AWSLambdaSQSQueueExecutionRole` | Read from **SQS queues** |
| `AWSLambdaVPCAccessExecutionRole` | Deploy Lambda functions **inside a VPC** |
| `AWSXrayWriteOnlyAccess` | Upload trace data to **AWS X-Ray** |

> **Tip:**  
> You can also create **custom policies** tailored to your Lambda’s specific needs.

---

## Lambda with Event Source Mapping

When using an **Event Source Mapping** (e.g., from SQS, DynamoDB Streams, or Kinesis):
- **Lambda itself** needs permissions to **read the event data**.
- Therefore, the **execution role** must have **read access** to the event source.

---

## Lambda Invoked by Other AWS Services

When Lambda is **invoked by other services** (e.g., **S3, SNS**):
- We use a **Resource-Based Policy** attached to the **Lambda function**.
- This allows **external services** to invoke the Lambda securely.

**Comparison:**

| **Scenario** | **Authorization Method** |
|:-------------|:---------------------------|
| Lambda **reads** from other AWS services | **Execution Role** (IAM Role) |
| Other AWS services **invoke** Lambda | **Resource-Based Policy** |

---

## How IAM Principals Access Lambda Functions

An **IAM principal** (user, role, or service) can invoke your Lambda if **one of two conditions** is met:
1. The **IAM Policy** attached to the principal authorizes the action.
   - Example: Your IAM user has `AdministratorAccess`.
2. A **Resource-Based Policy** on the Lambda function grants access.
   - Example: Amazon S3 triggers Lambda using a policy you set up.

> **Note:**  
> When using the AWS Management Console to integrate services,  
> **resource-based policies are automatically managed** behind the scenes.

---

## Summary of Best Practices

- **Create one execution role per Lambda function** to follow the principle of least privilege.
- **Use managed policies** where applicable to speed up configuration.
- **Customize policies** when your Lambda needs fine-grained permissions.
- **Understand when to use Resource-Based Policies** for external service invocations.

---

## Coming Up

Next, we’ll jump into the **AWS Console** to **explore how these policies are configured** manually and automatically!

---
