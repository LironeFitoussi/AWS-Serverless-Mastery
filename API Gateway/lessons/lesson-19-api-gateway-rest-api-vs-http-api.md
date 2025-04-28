# **Types of APIs in API Gateway: REST, HTTP, and WebSocket**

In **AWS API Gateway**, there are **three types of APIs** you can set up:  
**REST APIs**, **HTTP APIs**, and **WebSocket APIs**.  
Each serves a different use case and comes with its own features and limitations.

---

## **1. REST API**

- **Description**:
  - The **most fully-featured API type** in API Gateway.
  - The one we've been using throughout this course.

- **Key Features**:
  - **Data mappings** (request and response transformations).
  - **Usage plans** and **API keys** support.
  - Full support for:
    - **IAM authorization**
    - **Cognito User Pools**
    - **Lambda Authorizers**
  - **Resource policies** supported.
  - Can integrate with **AWS Lambda**, **HTTP backends**, and **AWS services**.
  - Native support for **OpenAPI definitions** (except native OpenID Connect and OAuth 2.0).

- **Use Cases**:
  - Complex APIs requiring **fine-grained control**, **throttling**, **quotas**, and **detailed monitoring**.

---

## **2. HTTP API**

- **Description**:
  - A **newer**, **simpler**, **low-latency**, and **lower-cost** alternative to REST APIs.
  - Focused on being **cost-effective** and **proxy-based**.

- **Key Features**:
  - **Proxy-only architecture**:
    - Supports **AWS Lambda Proxy**, **HTTP Proxy**, and **private integrations**.
  - **Built-in support for CORS**.
  - **Supports**:
    - **OpenID Connect (OIDC)**
    - **OAuth 2.0 Authorization**
  - **No support** for:
    - **Usage plans**
    - **API keys**
    - **Data mappings** (request/response transformations).
    - **Resource policies**.

- **Use Cases**:
  - **Simple APIs** that just need to forward requests with minimal setup.
  - When **low cost** and **low complexity** are priorities.

- **Important Note**:
  - **HTTP APIs are significantly cheaper** than REST APIs.

---

## **3. WebSocket API**

- **Description**:
  - Designed for **real-time, bi-directional communication** between client and server.

- **Key Features**:
  - Ideal for use cases like:
    - **Chat applications**
    - **Real-time dashboards**
    - **Streaming data**

- **Support**:
  - Clients can **send messages** to the server and **receive responses** without needing to poll.

- **Use Cases**:
  - **Real-time communication** when traditional request/response models (like REST) are insufficient.

---

# **Summary: REST vs. HTTP vs. WebSocket APIs**

| **Feature**              | **REST API** | **HTTP API** | **WebSocket API** |
|---------------------------|--------------|--------------|-------------------|
| **Cost**                  | Higher       | Lower        | N/A (depends on usage) |
| **Data Mappings**         | Supported    | Not Supported| N/A |
| **Usage Plans / API Keys** | Supported    | Not Supported| N/A |
| **Authorization Options** | IAM, Cognito, Lambda Authorizers | OIDC, OAuth 2.0 | IAM, Custom Authorizers |
| **CORS Support**          | Manual Setup | Built-in     | N/A |
| **Best Use Case**         | Full-featured APIs | Simple, low-cost proxy APIs | Real-time apps (chat, dashboards) |

---

# **Conclusion**

Choosing the right API type in **API Gateway** depends on your **application needs**:
- Use **REST APIs** for **feature-rich** complex APIs.
- Use **HTTP APIs** for **simple, cost-effective proxying**.
- Use **WebSocket APIs** for **real-time, event-driven applications**.

---
