# **Creating and Using AWS Lambda Function URLs**

In this hands-on example, we walk through **setting up a Lambda Function URL**, making it easy to expose a Lambda function directly over the internet via HTTPS—without using **API Gateway**.

## **Step 1: Create the Lambda Function**

- **Function Name**: `lambda-demo-url`
- **Runtime**: **Python 3.9**

After creation:

- Click **Test**.
- Create a new **Test Event** named `test`.
- Save and execute the event.

**Result**:
- Status Code: **200**
- Body: **"Hello from Lambda"**

This shows that the Lambda function returns an **HTTP-like response**, ready to be served through a URL.

---

## **Step 2: Publish a Lambda Version and Create an Alias**

- **Publish a New Version**:
  - Publish the current code as **Version 1**.
  
- **Create an Alias**:
  - Create an alias named **`dev`**.
  - Point the **`dev`** alias to **Version 1**.

---

## **Step 3: Create the Function URL**

- Navigate to the **Function URL** tab (left-hand menu).
- Click **Create Function URL**.

### **Configuration**

- **Authentication Type**:  
  - Set to **NONE** (public access without IAM authentication).

- **Resource Policy**:
  - Automatically generated to **allow public access**:
    ```json
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "lambda:InvokeFunctionUrl",
      "Resource": "your-lambda-function-arn"
    }
    ```

- **CORS Configuration** (optional):
  - You can specify allowed **origins**, **headers**, and **methods**.
  - Useful if your frontend application is hosted on a different domain.

### **Important**:
- The **Function URL is tied to an alias** (in this case, `dev`) or the **unpublished $LATEST version**.
- **You cannot attach a Function URL directly to a numbered version** (like Version 1).

---

## **Step 4: Test the Function URL**

- Copy the **Function URL**.
- Open it in a **web browser** or **HTTP client** (like `curl` or Postman).
- **Response**:
  ```
  Hello from Lambda
  ```

The **Function URL** provides **direct access** to your Lambda function over the internet, secured as per your resource-based policy.

---

## **Additional Notes**

- **Persistent URL**:
  - The generated URL **never changes** for a given alias or the $LATEST version.
  
- **Access Management**:
  - If authentication is needed, you can set **AuthType** to **AWS_IAM** instead of **NONE**.
  
- **Multiple URLs**:
  - You can create different **Function URLs** for:
    - The **unpublished $LATEST** version.
    - Different **aliases** (like **dev**, **prod**, etc.).
  - You **cannot** create Function URLs for specific published versions (e.g., `Version 1`, `Version 2`).

---

# **Summary**

- Lambda **Function URLs** allow you to **quickly and easily expose** Lambda functions over the public internet.
- **Resource-based policies** manage public or IAM-authenticated access.
- **Aliases** like `dev` provide flexibility and stable endpoints for specific function versions.
- **CORS settings** can be configured if needed for cross-origin calls.
