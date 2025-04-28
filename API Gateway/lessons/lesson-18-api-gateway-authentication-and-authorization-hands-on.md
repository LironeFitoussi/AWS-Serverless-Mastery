# **API Gateway Security Options Overview**

In this section, we walk through the different ways to **secure your API Gateway** using **IAM Authorization**, **Resource Policies**, and **Custom Authorizers**.

---

## **1. IAM Authorization**

- **Where to Set It**:  
  Under the **Method Request** settings of any method (e.g., GET, POST).
  
- **Purpose**:
  - Use **IAM policies** to **control access** to specific API methods.
  - Authenticate requests with **AWS SigV4** signing.
  
- **Ideal For**:
  - **Internal AWS usage** (services, IAM users, EC2, Lambda).
  - **Fine-grained permissions** based on users and roles.

---

## **2. Resource Policies**

- **Purpose**:
  - Control **who** can access the **entire API**, not just specific methods.
  
- **How It Works**:
  - Attach a **Resource Policy** (JSON document) at the API level.
  - Define access rules based on:
    - **AWS Accounts** (Cross-account access).
    - **IP Address ranges** (IP allow/deny lists).
    - **VPC sources** (private access within VPCs).

- **Template Examples**:
  - **AWS Account Allow List**: Grant access to specific AWS accounts.
  - **IP Range Deny List**: Block or allow access from specific IP addresses.
  - **Source VPC Allow List**: Restrict API access to certain VPCs (for private APIs).

- **Use Cases**:
  - Enabling **cross-account access**.
  - **Securing public APIs** by IP.
  - Restricting APIs to **private networks** (VPC endpoints).

---

## **3. API Gateway Authorizers**

If you're **not using IAM** for authorization, you can define an **Authorizer** to control access.

### **Types of Authorizers**:

#### **Lambda Authorizer (Custom Authorizer)**

- **Flexibility**:  
  Full control over how you **validate incoming requests**.

- **Setup**:
  - Define a **Lambda function**.
  - Configure how incoming requests (headers, tokens, query strings) are evaluated.
  - Optionally **cache** authorization results to reduce Lambda invocations.

- **Use Case**:
  - Integrating **third-party authentication systems** (e.g., Auth0, custom OAuth servers).
  - Custom token validation workflows.

---

#### **Cognito User Pool Authorizer**

- **Simplified Setup**:
  - Use **AWS Cognito** to **manage users** and **authenticate requests**.

- **Setup**:
  - Specify the **Cognito User Pool ARN** during authorizer creation.
  - API Gateway automatically handles **token validation**.

- **Use Case**:
  - Applications that **manage their own users** within **AWS Cognito**.
  - No need to write custom authentication logic.

---

# **Summary of Security Options**

| **Option**             | **Best For**                                           | **Setup Complexity** |
|-------------------------|--------------------------------------------------------|-----------------------|
| **IAM Authorization**   | Internal AWS services and users                        | Easy                  |
| **Resource Policies**   | Cross-account, IP-based, or VPC-based access control    | Moderate              |
| **Lambda Authorizer**   | Third-party auth integration, full custom logic         | Advanced              |
| **Cognito User Pools**  | Built-in user management via AWS                        | Easy                  |

---

# **Conclusion**

**AWS API Gateway** offers **multiple flexible ways** to **secure your APIs**, from using **IAM** for internal services to **Resource Policies** for network-level control, and **Authorizers** for user authentication.  
Choosing the right method depends on your application's specific needs for **authentication**, **authorization**, and **access control**.

---
