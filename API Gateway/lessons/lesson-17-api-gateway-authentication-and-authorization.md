# **API Gateway Security: IAM, Resource Policies, Cognito, and Lambda Authorizers**

Securing your APIs is a critical part of API Gateway design. AWS offers multiple layers of **authentication** and **authorization mechanisms** to control access to your APIs.

This guide covers the **three main security methods** for API Gateway:

---

## **1. IAM Authentication and Authorization**

**Best For**: APIs accessed **internally within AWS** (e.g., by EC2, Lambda, IAM users).

- **Authentication**:
  - Requests are authenticated using **AWS SigV4 Signing**.
  - Credentials (Access Key, Secret Key, Session Token) are **signed** and included in request headers.

- **Authorization**:
  - Controlled through standard **IAM policies**.
  
### **Workflow**:
1. **Client** makes a signed API request to API Gateway (using SigV4).
2. **API Gateway** verifies the signature and checks IAM permissions.
3. If allowed, the request is forwarded to the **backend** (e.g., Lambda function).
4. The response is returned to the client.

### **Advantages**:
- Strong native AWS security.
- Great for **internal** AWS usage.

---

## **2. Resource Policies**

**Best For**: **Cross-account access**, **IP whitelisting**, or **VPC access control**.

- **Resource Policies** are **JSON policy documents** attached directly to your API Gateway.
- Similar to **Lambda resource policies**, they define **who can access** the API and **from where**.

### **Use Cases**:
- Allow **cross-account access** to an API.
- Restrict access based on **IP address ranges**.
- Restrict access based on **specific VPC endpoints**.

### **Example Policy Types**:
- **Cross-Account Resource Policy**: Allow another AWS Account access.
- **IP Whitelist or Blacklist**: Control access based on IP ranges.
- **Source VPC Whitelist**: Restrict access to a specific VPC.

> **Tip**: Resource Policies can **combine** with IAM authentication for layered security.

---

## **3. Cognito User Pools Authentication**

**Best For**: **Managing your own user base** without building a custom auth system.

- **Cognito User Pools**:
  - AWS-hosted **user database** (sign-up, sign-in, password reset, etc.).
  - Automatically manages **token issuance** (JWTs).

- **Workflow**:
  1. **Client** authenticates against the Cognito User Pool.
  2. **Client** receives a **JWT token**.
  3. **Client** calls the API Gateway with the JWT token in the headers.
  4. **API Gateway** validates the token **directly with Cognito**.
  5. If valid, the request is forwarded to the backend.

### **Advantages**:
- **No custom code** required.
- Token management and expiration are **handled automatically**.
- Integration is **simple** to set up through the console.

---

## **4. Lambda Authorizers (Custom Authorizers)**

**Best For**: **Third-party authentication systems** or **custom validation logic**.

- **Lambda Authorizer** (formerly called Custom Authorizer):
  - A Lambda function that **evaluates tokens** or **parameters** passed in a request.
  - Responsible for returning an **IAM policy** that grants or denies access.

### **Workflow**:
1. **Client** authenticates through a third-party service (e.g., Auth0).
2. **Client** gets a **token** and sends it to API Gateway (header, query param, etc.).
3. **API Gateway** calls the **Lambda Authorizer** function.
4. The **Lambda** function verifies the token:
   - Valid? ➔ Return **Allow** policy.
   - Invalid? ➔ Return **Deny** policy.
5. API Gateway **caches** the authorization result (for faster performance).
6. If authorized, API Gateway forwards the request to the backend.

### **Advantages**:
- **Highly flexible** — integrate with any external identity system.
- You **control** how tokens are verified and how access policies are generated.

### **Considerations**:
- **Custom coding required** in the Lambda Authorizer.
- **Costs** apply for Lambda invocations.
- **Caching** authorization results is **recommended** to optimize performance.

---

## **Summary: When to Use Which Security Mechanism**

| **Method**            | **Best When**                                 | **Notes** |
|------------------------|-----------------------------------------------|-----------|
| **IAM Authorization**  | Access by AWS Services, internal systems     | Leverages SigV4; strong AWS-native security. |
| **Resource Policies**  | Cross-account access, IP filtering, VPC access | Complements IAM; allows fine-grained access control. |
| **Cognito User Pools**  | Managing your own users securely             | Simplifies auth; no custom coding needed. |
| **Lambda Authorizer**  | External auth systems, custom auth logic     | Maximum flexibility; requires Lambda function development. |

---

# **Setting Up Security in API Gateway (Console Overview)**

### **At the Method Request Level**:
- Under **Method Request**, set the **Authorization**:
  - **IAM** (SigV4)
  - **Lambda Authorizer**
  - **Cognito User Pool Authorizer**

### **Setting Resource Policies**:
- Under **Resource Policy** settings:
  - Apply **Cross-Account**, **IP Restrictions**, or **VPC Source Policies**.

### **Creating Authorizers**:
- **Lambda Authorizer**:
  - Define Lambda function and cache settings.
- **Cognito Authorizer**:
  - Specify the **ARN of the Cognito User Pool**.

---

# **Conclusion**

Understanding **API Gateway Security** is vital for designing **robust and secure APIs**.  
Choosing the right method — **IAM**, **Resource Policy**, **Cognito**, or **Lambda Authorizer** — depends on your **application needs** and **integration complexity**.