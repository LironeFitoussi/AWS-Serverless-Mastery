# **Building Your First API with AWS API Gateway and Lambda**

In this guide, we will walk through creating a simple **REST API** using **AWS API Gateway** integrated with **AWS Lambda**. We'll build, configure, and deploy an API that responds to HTTP requests with dynamic responses from Lambda functions.

---

## **1. Setting Up the API Gateway**

### **Choosing the API Type**
- Open the **API Gateway Console**.
- API Types available:
  - **HTTP APIs**
  - **WebSocket APIs**
  - **REST APIs** (public/private)

👉 **For this lesson, we use REST API**.

- Choose to **"Try the new console"** (soon to be default).
- Select **REST API** → **Build**.

---

## **2. Creating the API**

### **Options Available**
- **Create new API**
- **Import** from OpenAPI definition
- **Clone** existing API
- **Start from example**

✅ **We will create a new API** named **MyFirstAPI**.

### **Choosing the Endpoint Type**
- **Regional**: Deployed in a single AWS region.
- **Edge-Optimized**: Deployed at AWS edge locations (optimized for global access).
- **Private**: Accessible only within your VPC.

👉 **We'll select Regional** for simplicity.

---

## **3. Adding Methods to the API**

- **Create a new method** (click on "Create Method").
- Select **HTTP Method: GET**.

### **Choosing Integration Type**
Integration options:
- **Lambda Function**
- **HTTP**
- **Mock**
- **AWS Service**
- **VPC Link**

👉 **We'll integrate with a Lambda Function**.

---

## **4. Creating the Lambda Function**

- Open **AWS Lambda Console** → **Create function**.
- Function name: **api-gateway-route-gets**.
- Runtime: **Python 3.11** (Python 3.x acceptable).

### **Lambda Code**
```python
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!'),
        'headers': {'Content-Type': 'application/json'}
    }
```

- **Deploy the function**.
- **Test** with a sample event to ensure it returns:
  - Status Code **200**
  - Body **"Hello from Lambda"**
  - Content-Type **application/json**

---

## **5. Integrating Lambda with API Gateway**

- Copy the **Lambda function ARN**.
- Paste it into the API Gateway method configuration.
- **Enable Lambda Proxy Integration** for full event forwarding.

🛡️ **Security Note**: API Gateway automatically updates the **resource-based policy** on Lambda to allow invocation.

---

## **6. Testing the API**

- Use the **Test** feature in API Gateway.
- Confirm response:
  - Status **200 OK**
  - Body **"Hello from Lambda"**
  - Content-Type **application/json**

### **Viewing Execution Logs**
- Go to **Monitoring** → **CloudWatch Logs**.
- Inspect the **event** object printed inside the Lambda function:
  - **Resource**, **Path**, **HTTP Method**, **Headers**, **Query Parameters**, etc.

---

## **7. Creating an Additional Resource**

### **Adding `/houses` Endpoint**
- Create a **Resource** `/houses`.
- Add a **GET Method** integrated with a new Lambda function.

### **Second Lambda Function**
- Name: **api-gateway-route-houses**
- Python code modified to:
```python
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from my pretty house!'),
        'headers': {'Content-Type': 'application/json'}
    }
```
- Deploy and test the function.

---

## **8. Deploying the API**

- Click on **Deploy API**.
- Create a new stage called **dev**.

After deployment, an **Invoke URL** is provided.

### **Testing via Web Browser**
- `https://{api-id}.execute-api.{region}.amazonaws.com/dev/`
  - Root `/dev` → **"Hello from Lambda"**
  - `/dev/houses` → **"Hello from my pretty house"**
  - Wrong paths return an error like **"Missing Authentication Token"**.

---

# **Conclusion**

You have now successfully:
- Created a **REST API** in **API Gateway**.
- Integrated it with **AWS Lambda** functions.
- Deployed and tested the API via browser and console.

This setup forms the **foundation** for building more complex serverless applications with AWS!
