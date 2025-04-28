# **Monetizing APIs with Usage Plans and API Keys in API Gateway**

After building your API, you may want to **control access**, **monitor usage**, or even **charge customers** for its use. In AWS API Gateway, this is managed through **Usage Plans** and **API Keys**.

---

## **What Are Usage Plans and API Keys?**

- **Usage Plan**:
  - Defines **who** can access your API.
  - Specifies **how much** and **how fast** they can access it.
  - Links **API keys** to control and monitor client access.

- **API Key**:
  - A **unique string** distributed to customers.
  - Used by clients to **authenticate** their requests to the API.
  - Must be included in the request header as:  
    ```
    x-api-key: YOUR_API_KEY
    ```

---

## **Capabilities of Usage Plans**

- **Throttle Limits**:
  - Controls **how fast** users can send requests (requests per second).

- **Quota Limits**:
  - Controls **how many** requests can be made within a given period (e.g., **10,000 requests per month**).

- **Access Control**:
  - Attach specific **API stages** and **methods** to the usage plan.
  - Control access at a **granular method-level**.

- **Metering**:
  - Monitor API usage **per API key** to track client activity and enforce limits.

---

## **How to Set Up Usage Plans and API Keys**

### **Step-by-Step Process**

1. **Create One or More APIs**
   - Build and deploy your API stages.

2. **Configure Methods to Require API Keys**
   - Specify at the method level (e.g., GET /items) that an **API Key** is required.

3. **Deploy the API to a Stage**
   - Example: Deploy to **prod** or **test** stages.

4. **Create or Import API Keys**
   - Generate API keys manually or import them.
   - These are distributed to your application developers (customers).

5. **Create a Usage Plan**
   - Define:
     - **Throttle settings** (rate and burst).
     - **Quota settings** (requests per day, week, or month).

6. **Associate API Stages and API Keys**
   - Link specific **API stages** and **API keys** to the usage plan.
   - **Important**: Skipping this association will break the usage control mechanism.

---

## **Important Details**

- **Supplying the API Key**:
  - Clients must include the API key in the request header:
    ```
    x-api-key: YOUR_API_KEY
    ```

- **Throttling vs. Quota**:
  - **Throttling**: Limits the speed of API usage (e.g., 100 requests per second).
  - **Quota**: Limits the total number of API calls over a period (e.g., 10,000 requests/month).

- **Security and Monitoring**:
  - Each API key is individually metered.
  - Throttling is applied **per API key**.

---

# **Conclusion**

By using **Usage Plans** and **API Keys**, you can:
- **Monetize** and **control** your API.
- **Throttle** and **meter** customer access.
- **Protect your backend** from abuse.
- **Track usage** for billing or reporting purposes.

Setting up these features properly ensures your API remains **secure**, **scalable**, and **ready for production use**.
