# **Hands-On: Performing a Canary Deployment in API Gateway**

In this demo, we walk through a **practical example** of setting up and using a **canary deployment** in **API Gateway** to gradually release a new version of a backend Lambda function.

---

## **Step 1: Create the API Resource and Method**

1. **Create a New Resource:**
   - **Resource Name:** `canary-demo`

2. **Create a GET Method:**
   - Integration type: **Lambda Proxy Integration**
   - Lambda function: **`stage-variables-get`**
   - **Invoke Lambda Version:** Add `:1` at the end of the Lambda ARN to explicitly call **Version 1**.
   
3. **Test the Method:**
   - Upon testing, it returns:  
     ```json
     {
       "message": "Hello from Lambda v1"
     }
     ```

---

## **Step 2: Deploy to a New Stage**

- **New Stage Name:** `canary`
- Test the endpoint `/canary/canary-demo` — you should see the response from **Lambda v1**.

---

## **Step 3: Set Up the Canary Deployment**

1. **Create a Canary in the Stage Settings:**
   - **Traffic Split:**  
     - **50%** goes to the canary (new version).  
     - **50%** remains on the original stage version.

   *(In a real-world scenario, you would typically start with only 5–10% for safer gradual rollout.)*

2. **Update the Lambda Integration:**
   - Edit the GET method.
   - Change the Lambda ARN to invoke **Version 2** (`:2`).
   - Save the integration settings.

3. **Test the Updated Method:**
   - Response now shows:  
     ```json
     {
       "message": "Hello from Lambda v2"
     }
     ```

---

## **Step 4: Deploy and Observe Canary Behavior**

- **Deploy the API** to the **Canary** stage.
- Refresh the URL `/canary/canary-demo` multiple times:
  - Responses will **randomly alternate** between:
    - `"Hello from Lambda v1"`
    - `"Hello from Lambda v2"`

This confirms that **traffic is split 50/50** between the old and new Lambda versions.

---

## **Step 5: Promote the Canary**

- After validating that the new version works correctly:
  - **Promote** the canary deployment to **replace** the existing stage deployment.
- Once promoted:
  - 100% of the traffic now consistently receives the **"Hello from Lambda v2"** response.

---

# **Summary**

This demo showed how to:
- Set up a **canary deployment**.
- **Split traffic** between two Lambda versions.
- **Test** the new deployment safely.
- **Promote** a successful canary to full production.

**Canary deployments** offer a risk-managed, flexible strategy for updating APIs in production environments!
