# **CORS (Cross-Origin Resource Sharing) with API Gateway**

When building APIs accessed by **web applications hosted on different domains**, **CORS** (Cross-Origin Resource Sharing) must be configured to allow secure communication.

---

## **What is CORS?**

- **CORS** is a **browser security feature**.
- It **controls how resources** on a web server can be requested from another domain (origin).
- If not properly configured, **browsers will block API calls** made from a different domain for security reasons.

---

## **How API Gateway Supports CORS**

- **API Gateway** allows you to **enable CORS** easily via the console.
- When CORS is enabled, **API Gateway automatically handles** **OPTIONS pre-flight requests** from browsers.

### **CORS Headers Set by API Gateway**

When handling a pre-flight request, the following headers are typically set:

| **Header**                    | **Purpose** |
|---------------------------------|-------------|
| `Access-Control-Allow-Methods` | Lists HTTP methods (GET, POST, etc.) allowed for the resource. |
| `Access-Control-Allow-Headers` | Lists headers clients can include in their requests. |
| `Access-Control-Allow-Origin`  | Specifies which domains are allowed to call the API. |

---

## **Concrete Example: How CORS Works with API Gateway**

1. **Website Content**:
   - Browser loads a static website hosted on **Amazon S3** at  
     `https://www.example.com`.

2. **JavaScript API Call**:
   - JavaScript running on the browser tries to make an **API request** to  
     `https://api.example.com` (different origin).

3. **Pre-flight OPTIONS Request**:
   - The browser automatically sends an **OPTIONS** request to `api.example.com` to **check permissions**.

4. **API Gateway Response**:
   - If CORS is properly configured, API Gateway returns the correct **CORS headers** allowing the cross-origin request.

5. **API Communication**:
   - After a successful pre-flight response, the browser proceeds with the actual API request.

---

## **Important Notes for Exam and Practice**

- **CORS must be enabled** on API Gateway for **cross-origin requests** to work.
- You can **configure CORS** directly from the **API Gateway console** for each method or resource.
- **Pre-flight responses** are automatic once CORS is correctly set up.

---

# **Conclusion**

CORS is critical when your frontend and backend **live on different domains**.  
By properly enabling **CORS settings** in API Gateway, you ensure your **web applications can communicate securely** with your APIs across domains.
