# **Importing and Exporting OpenAPI Definitions in API Gateway**

In this lesson, we explore how to **import** and **export** **OpenAPI** specifications in **AWS API Gateway**, and how this supports SDK generation and easier API management.

---

## **Importing an OpenAPI Definition**

- **Step 1: Create a New REST API**
  - Choose **REST API**.
  - Click on **Import** instead of creating a blank API.

- **Step 2: Provide an OpenAPI Definition**
  - You must have an **API definition file** in **OpenAPI format** (either JSON or YAML).
  - **Example**:  
    - Click **Example API** to use a sample definition.
    - This sample defines a basic API structure for the API Gateway.

- **Step 3: Create the API**
  - After importing the definition, a new API will be created.
  - **Example**:
    - The **Pet Store API** gets automatically created.
    - It includes all the necessary **resources**, **methods**, and **settings** as defined in the OpenAPI file.

### **Key Benefit**:
- Quickly and automatically **build APIs** based on a **standardized API specification**.

---

## **Exporting an API as OpenAPI**

- **Step 1: Navigate to Your API**
  - Open the API you want to export.

- **Step 2: Go to a Stage**
  - Example: Select the **prod** stage.

- **Step 3: Stage Actions → Export API**
  - **Choose the export options**:
    - **Format**:
      - **Swagger 2.0**
      - **OpenAPI 3.0**
    - **Serialization**:
      - **JSON** or **YAML**
    - **Extensions**:
      - Include **API Gateway extensions**.
      - Include **Postman extensions** if needed.

- **Step 4: Download the Exported File**
  - The export will generate a full OpenAPI spec that you can:
    - Import elsewhere.
    - Version control.
    - Use in documentation.
    - Share with other teams.

---

## **Generating SDKs from OpenAPI**

Another major advantage of exporting in OpenAPI format is the ability to **automatically generate SDKs** for different programming platforms.

- **Supported Platforms**:
  - **Android**
  - **JavaScript**
  - **iOS**
  - **Java**
  - **Ruby**
  
- **Purpose**:
  - Simplify the process of building applications that interact with your API.
  - Auto-generate client libraries based on the API structure.

### **Example Workflow**:
1. Export your API as an OpenAPI 3.0 JSON file.
2. Use the API Gateway SDK generation feature.
3. Download the SDK for your target platform.
4. Integrate it into your application.

---

# **Conclusion**

The ability to **import** and **export OpenAPI specifications** makes AWS API Gateway extremely flexible and developer-friendly. You can quickly bootstrap APIs, automate documentation, perform validations, and simplify client-side development with SDK generation — all powered by standard, reusable OpenAPI files.