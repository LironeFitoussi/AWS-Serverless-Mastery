# **Caching Responses in API Gateway**

Caching in **AWS API Gateway** is a powerful feature that helps **reduce backend load**, **improve performance**, and **optimize costs** in production environments. Let's dive into how caching works, its configurations, and best practices.

---

## **What is Caching?**

- **Caching** temporarily stores **responses** at the **API Gateway level**.
- When a client sends a request:
  - If the response **exists in the cache**, it is **returned immediately** without calling the backend (**cache hit**).
  - If the response is **not found**, API Gateway **forwards** the request to the backend and **stores** the response for future requests (**cache miss**).

### **Benefits of Caching**:
- **Reduced backend pressure**.
- **Faster response times**.
- **Lower operational costs**.

---

## **Caching Settings and Limits**

- **Default TTL (Time to Live)**:  
  **300 seconds** (5 minutes).
  
- **TTL Range**:  
  - **Minimum**: `0 seconds` (no caching).
  - **Maximum**: `3600 seconds` (1 hour).

- **Cache Level**:
  - Defined **per stage** (e.g., **prod** stage).
  - Can be **overridden per method** if specific behavior is needed.

- **Cache Size Options**:
  - Ranges from **0.5 GB to 237 GB**.
  
- **Encryption**:
  - **Optional**: Cache data can be **encrypted** for additional security.

- **Cost Consideration**:
  - **Caches are expensive**.
  - Recommended **only for production or pre-production** environments, **not for development or testing**.

---

## **Invalidating the Cache**

- **Manual Invalidation**:
  - Invalidate the entire cache **immediately** from the AWS Console.

- **Client-Triggered Invalidation**:
  - Clients can send a request with the HTTP header:  
    ```
    Cache-Control: max-age=0
    ```
  - **IAM Authorization Required**:
    - Clients must have a specific **IAM policy** allowing them to invalidate the cache.
    - If authorization is not enforced, **any client** could invalidate the cache — which could lead to serious issues.

- **Invalidation Authorization Behavior**:
  - If unauthorized:
    - **Ignore** the cache-control header.
    - **Fail** with a `403 Forbidden`.
    - **Log a warning**.

---

## **Enabling and Configuring Caching**

**Steps to Enable Caching**:

1. **Navigate to Stage Settings**:
   - Example: **prod** stage ➔ **Edit Stage Details**.

2. **Enable Cache**:
   - Select cache capacity.
   - Choose whether to **encrypt** cache data.
   - Set **TTL** for cached responses (0 to 3600 seconds).

3. **Per-Key Cache Invalidation**:
   - Fine-grained invalidation based on **specific keys**.
   - Can be risky; recommend enforcing **authorization**.

4. **Method-Level Cache Override**:
   - For individual methods (e.g., a specific **GET** method):
     - Customize TTL.
     - Define specific cache invalidation rules.

---

## **Testing the Cache**

- When caching is active:
  - The **first request** will fetch data from **Lambda**.
  - **Subsequent requests** will serve data **directly from the cache**.
  
- **Visual Confirmation**:
  - The response might not visibly change.
  - Behavior (speed and backend invocation count) indicates caching is working.

---

## **Important Notes**

- **Disable the cache after practice** to **avoid unnecessary costs**.
- Always plan caching around **actual traffic patterns** and **application needs**.

---

# **Conclusion**

Enabling **API Gateway caching** optimizes your application's performance and reduces backend load. However, it must be **carefully managed** to avoid unnecessary expenses and to maintain proper cache invalidation control.