# **Deploying AWS Lambda Functions Inside a VPC: Hands-On**

This guide walks through deploying a **Lambda function** into a **VPC**, setting up the correct **networking** and **permissions**.

## **Step 1: Create the Lambda Function**

- **Author** a new Lambda function:
  - Name: **LambdaVPC**
  - **Runtime**: Python 3.8
- Create the function from **scratch**.

## **Step 2: Create a Security Group for Lambda**

- Navigate to the **EC2 Console** → **Security Groups**.
- Create a new security group:
  - Name: **LambdaSG**
  - **VPC**: Attach to your existing VPC.
  - **Inbound Rules**: None needed (inbound rules are **not required** for Lambda itself).
  - **Outbound Rules**: Default settings, can be modified depending on access needs.

## **Step 3: Attach the Lambda to the VPC**

- In the Lambda function:
  - Go to the **Configuration** tab → **VPC** section → **Edit**.
  - Select:
    - The **VPC**.
    - **Subnets** (can select public or private, but remember the caveats below).
    - Attach the **LambdaSG** security group.

⚠️ **Important Note**:  
- Even if you deploy Lambda in **public subnets**, **it will not have internet access** automatically.
- To **access the internet**, you must:
  - Deploy Lambda into **private subnets**.
  - Route traffic through a **NAT Gateway** or **NAT Instance** placed in a public subnet.

> This setup is critical for accessing external APIs or internet-based services.

If Lambda’s purpose is **internal** (e.g., accessing RDS, ElastiCache), no internet access is needed.

## **Step 4: Fix Permission Issues**

- When attaching a Lambda to a VPC, it needs to **create network interfaces (ENIs)**.
- Error encountered:  
  - _“The Lambda function does not have permission to create network interfaces.”_

**Solution**:
1. Open Lambda's **Execution Role** in the **IAM console**.
2. Attach the **AWS managed policy**:  
   **AWSLambdaENIManagementAccess**  
   - Grants permissions like **CreateNetworkInterface**, **DeleteNetworkInterface**, **DescribeNetworkInterfaces**, etc.

## **Step 5: Deploy and Test**

- Save the updated Lambda configuration.
- **Note**: Initial deployment inside a VPC may take **several minutes** (around 3 minutes observed).
- Once updated:
  - **Create a test event** and **execute the function**.
  - Confirm **successful execution**.

## **Step 6: Verify ENI Creation**

- Go to the **EC2 Console** → **Network Interfaces**.
- You will see multiple **ENIs** created:
  - Each ENI corresponds to one **Availability Zone** and **subnet** selected for the Lambda.
  - ENIs handle **VPC networking** for your Lambda function.

Each ENI + the attached security group will:
- Control access to services like **RDS**, **ElastiCache**, and others inside the VPC.

---

# **Key Takeaways**

✅ Lambda needs ENIs to communicate within VPCs.  
✅ Security Groups mainly control **outbound** access for Lambda.  
✅ Internet access requires **private subnets + NAT devices**.  
✅ Always assign **proper IAM permissions** to manage ENIs.  
✅ First deployment can take a few minutes but improves afterward.
