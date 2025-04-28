# **API Gateway Integration Types Explained**

In this lesson, we explored the different ways **API Gateway** can integrate with backend services. Understanding these methods is crucial for designing effective APIs in AWS. Below is a structured breakdown:

---

## **1. Integration Type: MOCK**

- **Purpose:** Simulates a backend response without reaching a backend service.
- **Use Case:** Development and testing when backend work is not yet ready.
- **Important:**  
  - **Not** suitable for production environments.
  - Helps during early API configuration stages.

---

## **2. Standard Integration (HTTP, AWS Lambda, Other AWS Services)**

- **Behavior:** API Gateway **forwards** the request to a backend service **after optional modifications**.
- **Key Configurations:**
  - **Integration Request**: Modify or map the request before reaching the backend.
  - **Integration Response**: Modify the backend response before it reaches the client.
- **Mapping Templates:**
  - Allows **data transformation** between the client request and backend.
  - Example use: 
    - Modify a REST API call into a format suitable for an **SQS Queue**.
    - Rename, reorder, and transform fields.
- **Mapping Language:**  
  - **Velocity Template Language (VTL)**  
    - Supports loops, conditions (`if` statements), and data manipulation.
- **Content-Type Requirement:**  
  - Must set **`Content-Type: application/json`** or **`application/xml`** to use templates.

---

## **3. Lambda Proxy Integration (AWS Proxy)**

- **Behavior:** Passes the full request directly to the Lambda function **without modification**.
- **Features:**
  - **No mapping templates** are allowed.
  - All client request data (headers, query strings, path, body, etc.) are passed into the Lambda as a single **event object**.
- **Lambda Responsibilities:**
  - Parse and process the incoming event.
  - Formulate and return the response including:
    - **Status code**
    - **Headers**
    - **Response body**
- **Best For:** Simplified and direct API-to-Lambda interactions.

---

## **4. HTTP Proxy Integration**

- **Behavior:** Like Lambda Proxy but targets **HTTP backends** instead of Lambda.
- **Features:**
  - No request/response mapping unless you manually add headers.
  - Entire client request is proxied to the backend.
- **Optional Enhancement:**
  - Add hidden **HTTP headers** (e.g., **API keys**) between the API Gateway and backend.
  - Clients remain unaware of these backend-required details.

---

## **Mapping Templates: Practical Applications**

- **Data Transformation Examples:**
  - **Integrating with a SOAP API:**
    - Client interacts using **JSON**.
    - API Gateway uses a **mapping template** to convert JSON to **XML** for the SOAP backend.
    - Converts SOAP XML responses back to JSON for the client.
  - **Renaming Query String Parameters:**
    - Example: `?name=foo&other=bar`
    - Through mapping, pass variables into Lambda as `{ "myVarFoo": "foo", "myVarBar": "bar" }`.

---

# **Summary: Key Points**

| Integration Type       | Request/Response Modifications | Backend | Best Use |
|-------------------------|--------------------------------|---------|----------|
| **MOCK**                | No                            | None    | Testing  |
| **HTTP/Lambda (Non-Proxy)** | Yes (with Mapping Templates) | HTTP/Lambda/AWS Service | Transform Data |
| **Lambda Proxy**        | No                            | Lambda  | Simple Lambda APIs |
| **HTTP Proxy**          | No                            | HTTP backend | Quick Backend Proxying |
