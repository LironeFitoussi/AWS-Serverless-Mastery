# **Testing Mapping Templates in API Gateway**

In this section, we walk through a hands-on example of how to **use mapping templates** in API Gateway by integrating it with a simple **AWS Lambda** function — **without using proxy integration**.

---

## **Step 1: Set Up the API Resource and Method**

- **Create a Resource**:  
  Name: **`/mapping`**

- **Create a Method under `/mapping`**:
  - Method: **GET**
  - Integration Type: **Lambda Function** (without **Lambda Proxy Integration** enabled)

---

## **Step 2: Create the Lambda Function**

- **Function Name**:  
  `api_gateway_mapping_get`

- **Runtime**:  
  **Python 3.11**

- **Simple Return Value**:
  ```python
  def lambda_handler(event, context):
      return {"example": "hello world"}
  ```

- **Deploy and Test**:
  - Using a simple test event.
  - The Lambda returns:
    ```json
    {
      "example": "hello world"
    }
    ```

---

## **Step 3: Connect Lambda to API Gateway**

- Copy the **Lambda ARN** and **paste it** into the API Gateway integration settings.
- Create the **GET method** without enabling proxy integration.

### **Key Behavior**:
- Since **proxy integration is disabled**, the **Lambda function's raw response** is directly used without needing `statusCode`, `headers`, or any additional structure.

- Testing the API endpoint at this point gives:
  ```json
  {
    "example": "hello world"
  }
  ```
  with a **status code 200**.

---

## **Step 4: Modify the Response with a Mapping Template**

Now, let's **change the structure of the response** using a **Mapping Template**.

- **Navigate to**:  
  Integration Response ➔ Mapping Templates

- **Create a new Mapping Template**:
  - **Content-Type**: `application/json`
  
- **Template Body Example**:
  ```json
  {
    "my_key": "my_value",
    "renamed_key": "$input.json('$.example')"
  }
  ```

### **Explanation**:
- `my_key` is a **static key-value pair**.
- `renamed_key` dynamically retrieves the original `"example"` field's value (`"hello world"`) from the Lambda's JSON output using **VTL (Velocity Template Language)** syntax.

### **Syntax Breakdown**:
- `$input.json('$.example')`:  
  Fetches the `example` field from the original Lambda JSON output.

**Note**:  
You don’t need to memorize the full VTL syntax for the exam — just understand that **Mapping Templates** exist and they **transform API requests and responses**.

---

## **Step 5: Test the Modified Response**

After applying the mapping template:

- Re-test the method.

- **New Response Body**:
  ```json
  {
    "my_key": "my_value",
    "renamed_key": "hello world"
  }
  ```

### **Result**:
- The raw Lambda output was **transformed** by the mapping template **before being returned** to the client.
- This demonstrates the power of **controlling the final response format** without modifying the Lambda function itself.

---

# **Key Takeaways**

- **Mapping Templates** can be applied on both **integration requests** and **integration responses**.
- **Without Proxy Integration**: API Gateway allows full control over how data is sent to and received from the backend.
- **Velocity Template Language (VTL)** is used to manipulate requests and responses dynamically.

Mapping templates are a great way to **adapt your API Gateway interface** to different client or backend expectations without needing changes to the backend logic.
