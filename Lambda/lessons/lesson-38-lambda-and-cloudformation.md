# 📄 Deploying AWS Lambda Functions Using CloudFormation
    
In this lesson, we explore **two different ways** to **deploy AWS Lambda functions** using **AWS CloudFormation**. We'll also cover **best practices for handling dependencies** and **cross-account deployments**.

---

## 🛠 Methods to Upload Lambda with CloudFormation

### 1. **Inline Code Deployment**

- **Use Case**: For **very simple Lambda functions** without any external dependencies.
- **Implementation**: Embed your Lambda code **directly inside the CloudFormation template** using the `Code.ZipFile` property.

  ```yaml
  Resources:
    MyLambdaFunction:
      Type: AWS::Lambda::Function
      Properties:
        Handler: index.handler
        Role: <Lambda_Execution_Role_ARN>
        Runtime: nodejs14.x
        Code:
          ZipFile: |
            exports.handler = async (event) => {
              return 'Hello from Lambda!';
            };
  ```

⚡ **Limitations**:  
- Cannot include external **dependencies**.
- Best suited for very **small scripts** or **quick testing**.

---

### 2. **Zip File Upload via S3**

- **Use Case**: For **real-world Lambda functions** with **dependencies**.
- **Implementation**: 
  - Store the packaged Lambda `.zip` file **in an S3 bucket**.
  - Reference the **S3 Bucket**, **S3 Key** (file path), and optionally the **S3 Object Version** in your CloudFormation template.

  ```yaml
  Resources:
    MyLambdaFunction:
      Type: AWS::Lambda::Function
      Properties:
        Handler: index.handler
        Role: <Lambda_Execution_Role_ARN>
        Runtime: nodejs14.x
        Code:
          S3Bucket: my-lambda-functions-bucket
          S3Key: lambdas/my-function.zip
          S3ObjectVersion: <object_version_id> # Recommended if using versioned buckets
  ```

✅ **Best Practice**:  
Enable **S3 bucket versioning** to avoid caching issues.  
- If you upload a new zip file but **don't update** the S3 Key or Object Version, **CloudFormation will not update** the function automatically.
- Updating the **S3ObjectVersion** ensures **CloudFormation detects changes** and **updates the function** correctly.

---

## 🌎 Deploying Across Multiple AWS Accounts

When deploying Lambda code from an S3 bucket in **Account 1** into Lambda functions in **Account 2** or **Account 3**, follow these steps:

1. **In Account 1** (where the S3 bucket exists):
   - Add a **bucket policy** that **grants access** to the other accounts.
   - Example:
     ```json
     {
       "Effect": "Allow",
       "Principal": {
         "AWS": [
           "arn:aws:iam::ACCOUNT_2_ID:root",
           "arn:aws:iam::ACCOUNT_3_ID:root"
         ]
       },
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::my-lambda-functions-bucket/*"
     }
     ```

2. **In Account 2 and 3** (where the function will be deployed):
   - Ensure the **CloudFormation execution role** has permissions to **access and retrieve** objects from the S3 bucket.
   - Example IAM permissions for the role:
     ```json
     {
       "Effect": "Allow",
       "Action": [
         "s3:GetObject",
         "s3:ListBucket"
       ],
       "Resource": [
         "arn:aws:s3:::my-lambda-functions-bucket",
         "arn:aws:s3:::my-lambda-functions-bucket/*"
       ]
     }
     ```

By combining the **S3 bucket policy** and the **CloudFormation execution role permissions**, you can successfully deploy Lambda functions across multiple AWS accounts.

---

## 🎯 Key Takeaways

- **Inline Code** is suitable for simple, dependency-free functions.
- **Zip Upload via S3** is best for production-grade Lambda functions with dependencies.
- **Versioning in S3** is highly recommended to ensure proper function updates.
- **Cross-account deployments** require careful setup of **bucket policies** and **IAM execution roles**.

---

> This lecture set the foundation for automating Lambda deployments at scale using CloudFormation, while ensuring secure and reliable cross-account access!

---
