# **Networking and AWS Lambda Functions**

When deploying AWS Lambda functions, understanding **networking** is crucial to ensure proper access to resources inside your **Virtual Private Cloud (VPC)**.

## **Default Networking Behavior**

- **By default**, Lambda functions are launched **outside of your VPC** — they operate within an AWS-managed VPC.
- Consequently, they **cannot access private resources** inside your VPC, such as:
  - **EC2 instances**
  - **RDS databases**
  - **ElastiCache**
  - **Internal Elastic Load Balancers**

Lambda functions can still access:
- **Public websites**
- **External APIs**
- **AWS services** like **DynamoDB** (via public endpoints)

## **Accessing Private VPC Resources**

To allow Lambda functions to interact with private VPC resources:
1. **Deploy the Lambda inside your VPC**.
2. Specify:
   - **VPC ID**
   - **Subnets**
   - **Security Groups**
3. AWS automatically creates an **Elastic Network Interface (ENI)** in the selected subnets.

### **Required Permissions**
- The Lambda function must have the **Lambda VPC Access Execution Role** to create ENIs.

### **Communication Flow**
- The Lambda function uses the **ENI** to communicate with private resources (e.g., RDS).
- Ensure that the **RDS security group** **allows inbound connections** from the **Lambda security group**.

## **Internet Access for Lambda Functions in VPC**

Deploying a Lambda function into a **public subnet** does **not** grant **public internet access**. 
- **Important**: Unlike EC2, Lambda functions do **not** automatically receive public IPs.

### **How to Grant Internet Access**
- Deploy Lambda functions into **private subnets**.
- Configure a **NAT Gateway** or **NAT Instance** in a public subnet.
- Update **Route Tables** to route traffic from private subnets through the NAT device to the Internet Gateway.

### **Architecture Overview**
- **Lambda (private subnet)** → **NAT Gateway/Instance (public subnet)** → **Internet Gateway** → **External Internet**

## **Accessing DynamoDB from Lambda**

There are two options:
1. **Via Public Internet**:
   - Requires NAT Gateway/Instance setup.
2. **Privately through a VPC Endpoint**:
   - Create a **VPC Gateway Endpoint** for **DynamoDB**.
   - Lambda accesses DynamoDB **without using** the internet or NAT devices.

## **CloudWatch Logs**
- Lambda functions **always** send logs to **CloudWatch Logs**, **even without** NAT Gateways or VPC Endpoints.

