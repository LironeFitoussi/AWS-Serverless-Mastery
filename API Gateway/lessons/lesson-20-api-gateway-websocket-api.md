# **Types of APIs in AWS API Gateway: REST, HTTP, and WebSocket**

In AWS API Gateway, you can build three different types of APIs: **REST APIs**, **HTTP APIs**, and **WebSocket APIs**.  
Each type serves different use cases and offers distinct features and trade-offs.

---

## **1. REST API**

- **Description**:
  - The traditional and most **feature-rich** API type.
  - This is the API type we've primarily used throughout this course.

- **Key Features**:
  - Supports **data mapping** for requests and responses.
  - Allows **usage plans** and **API keys**.
  - Full integration with:
    - **IAM authorization**
    - **Cognito User Pools**
    - **Lambda Authorizers**
    - **Resource Policies**
  - Designed for complex workflows requiring **fine-grained control** and **detailed management**.

- **Missing Native Support**:
  - **OpenID Connect** (OIDC) and **OAuth 2.0** directly.

---

## **2. HTTP API**

- **Description**:
  - A **newer**, **simplified**, and **cost-effective** alternative to REST APIs.
  - Primarily designed for **proxying** requests to AWS Lambda functions, HTTP backends, or private integrations.

- **Key Features**:
  - **Low latency** and **lower cost** than REST APIs.
  - **Proxy-only architecture** — no data mapping.
  - **Built-in CORS** (Cross-Origin Resource Sharing) support.
  - **Supports Authorization**:
    - **OpenID Connect (OIDC)**
    - **OAuth 2.0**

- **Limitations**:
  - **No support** for:
    - Usage plans
    - API keys
    - Data mapping
    - Resource policies

- **Best Use Cases**:
  - When you need a **simple, inexpensive** API to **proxy** requests with **minimal overhead**.

- **Important to Remember for Exams**:
  - **HTTP APIs are much cheaper** than REST APIs.
  - **HTTP APIs do not support resource policies**.

---

## **3. WebSocket API**

- **Description**:
  - Designed for **real-time**, **bi-directional communication** between clients and servers.

- **Use Cases**:
  - **Chat applications**
  - **Real-time dashboards**
  - **Live notifications**

- **Architecture**:
  - Clients and servers maintain a **persistent connection**, enabling **instant messaging** without repeated HTTP requests.

---

# **Summary: REST vs HTTP vs WebSocket APIs**

| **Feature**               | **REST API**                  | **HTTP API**                 | **WebSocket API**             |
|----------------------------|--------------------------------|-------------------------------|-------------------------------|
| **Cost**                   | Higher                        | Lower                        | Depends on connection time   |
| **Data Mapping**           | Supported                     | Not Supported                | N/A                           |
| **Usage Plans and API Keys**| Supported                     | Not Supported                | N/A                           |
| **Authorization Options**  | IAM, Cognito, Lambda Authorizers | OIDC, OAuth 2.0 Only        | IAM, Custom Authorizers       |
| **CORS Support**           | Manual setup                  | Built-in                     | N/A                           |
| **Best Use Case**          | Full-featured APIs            | Simple, low-cost proxy APIs   | Real-time communication       |

---

# **Conclusion**

Choosing between **REST**, **HTTP**, and **WebSocket APIs** depends on your project requirements:
- Use **REST APIs** when you need **advanced features** and **fine-grained control**.
- Use **HTTP APIs** for **simple, low-cost API proxying**.
- Use **WebSocket APIs** for **real-time, event-driven applications**.

---
