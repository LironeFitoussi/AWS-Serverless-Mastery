# **Types of APIs in AWS API Gateway: REST, HTTP, and WebSocket**

In AWS API Gateway, you can create **three types of APIs**:  
**REST APIs**, **HTTP APIs**, and **WebSocket APIs**.  
Each serves different use cases, with varying levels of complexity, cost, and supported features.

---

## **1. REST API**

- **Overview**:
  - The traditional and most **feature-rich** API type in API Gateway.
  - Used extensively in this course.

- **Key Features**:
  - Supports **data mappings** (request and response transformations).
  - Allows configuration of **usage plans** and **API keys**.
  - Integrates with:
    - **IAM Authorization**
    - **Cognito User Pools**
    - **Lambda Authorizers**
    - **Resource Policies**
  - Designed for complex, highly customizable API architectures.

- **Limitations**:
  - **No native support** for **OpenID Connect (OIDC)** and **OAuth 2.0** (external authorization protocols).

---

## **2. HTTP API**

- **Overview**:
  - A **newer**, **simpler**, and **lower-cost** alternative to REST APIs.
  - Primarily focused on **proxy-based** integrations.

- **Key Features**:
  - **Low latency** and **cost-effective**.
  - Supports **proxying** to:
    - **AWS Lambda functions**
    - **HTTP backends**
    - **Private integrations**
  - **Built-in support for CORS** (Cross-Origin Resource Sharing).
  - Supports **authorization** through:
    - **OpenID Connect (OIDC)**
    - **OAuth 2.0**

- **Limitations**:
  - **No support** for:
    - **Data mappings**
    - **Usage plans**
    - **API keys**
    - **Resource policies**

- **Important to Remember**:
  - **HTTP APIs are much cheaper** than REST APIs.
  - They are designed for **simple, direct proxying** use cases.

- **Fun Fact**:
  - Although extremely practical, HTTP APIs are **sometimes confusingly named** — they are actually a simplified version of REST APIs, **not an entirely different protocol**.

---

## **3. WebSocket API**

- **Overview**:
  - Built for **real-time, bidirectional communication** between client and server.

- **Key Features**:
  - Ideal for:
    - **Chat applications**
    - **Real-time dashboards**
    - **Streaming updates**
  - Maintains **persistent connections** for live communication.

- **Use Cases**:
  - Where a **request/response model** is insufficient, and **continuous, real-time interaction** is required.

---

# **REST API vs. HTTP API: Key Differences**

| **Feature**               | **REST API**                | **HTTP API**               |
|----------------------------|------------------------------|-----------------------------|
| **Cost**                   | Higher                      | Lower                       |
| **Data Mappings**          | Supported                   | Not Supported               |
| **Usage Plans and API Keys**| Supported                   | Not Supported               |
| **Authorization Methods**  | IAM, Cognito, Lambda Authorizers | OIDC, OAuth 2.0          |
| **Resource Policies**      | Supported                   | Not Supported               |
| **Best Use Case**           | Complex, feature-rich APIs  | Simple, low-cost proxy APIs |

---

# **Conclusion**

In summary:
- Use **REST APIs** when you need **advanced features**, **fine-grained control**, and **extensive integration options**.
- Use **HTTP APIs** when you need a **simple**, **cost-effective**, and **low-latency proxy**.
- Use **WebSocket APIs** for **real-time**, **bidirectional communication** scenarios.
