# **Using Stage Variables in API Gateway to Manage Lambda Aliases**

In this lesson, we explore how **API Gateway Stage Variables** allow dynamic invocation of different **Lambda function versions** through **aliases**. This technique enables you to control which version of a Lambda function gets invoked per deployment stage (e.g., **DEV**, **TEST**, **PROD**) without modifying your API configurations manually.

---

## **Step 1: Create and Version a Lambda Function**

1. **Author a Lambda Function:**
   - **Name:** `api-gateway-stage-variables-get`
   - **Runtime:** Python 3.11
   - **Initial Code:**  
     ```python
     def lambda_handler(event, context):
         return {"message": "Hello from Lambda v1"}
     ```

2. **Test the Lambda:**  
   Deploy and test the function to confirm it returns `"Hello from Lambda v1"`.

3. **Publish Version 1:**  
   - Navigate to **Actions > Publish new version**.
   - Save as **v1**.

4. **Update Code for Version 2:**
   - Change the message to `"Hello from Lambda v2"`.
   - Deploy, test, and publish **v2**.

5. **Create Latest Version for Development:**
   - Update message to `"Hello from Lambda DEV"`.
   - Deploy and test.
   - **Do not publish** — leave this as the **latest version**.

---

## **Step 2: Create Lambda Aliases**

- **DEV Alias:** Points to **Latest** version.
- **TEST Alias:** Points to **Version 2**.
- **PROD Alias:** Points to **Version 1**.

**Tip:** Aliases simplify managing different versions for various environments.

---

## **Step 3: Configure API Gateway to Use Stage Variables**

1. **Create a GET Method** in API Gateway.
2. **Set Integration Type:** Lambda Proxy.
3. **Lambda Function ARN Format:**
   ```plaintext
   arn:aws:lambda:region:account-id:function:function-name:${stageVariables.lambdaAlias}
   ```

   - **`${stageVariables.lambdaAlias}`** dynamically selects the Lambda alias based on the deployment stage.

4. **Fixing Permission Issues:**
   - The provided permission script might duplicate the ARN.
   - Correct it to reference the alias properly, for example:
     ```bash
     aws lambda add-permission \
       --function-name arn:aws:lambda:region:account-id:function:function-name:DEV \
       --statement-id apigateway-dev-permission \
       --action lambda:InvokeFunction \
       --principal apigateway.amazonaws.com
     ```
   - Repeat for **TEST** and **PROD** aliases.

---

## **Step 4: Deploy API Gateway Stages and Set Stage Variables**

- **Deploy to DEV Stage:**
  - Add **Stage Variable**: `lambdaAlias = DEV`
- **Deploy to TEST Stage:**
  - Add **Stage Variable**: `lambdaAlias = TEST`
- **Deploy to PROD Stage:**
  - Add **Stage Variable**: `lambdaAlias = PROD`

---

## **Step 5: Testing the Deployment**

- Access the deployed API URLs:
  - **DEV Stage URL:** Returns `"Hello from Lambda DEV"`
  - **TEST Stage URL:** Returns `"Hello from Lambda v2"`
  - **PROD Stage URL:** Returns `"Hello from Lambda v1"`

**Conclusion:**  
Using **stage variables** in API Gateway provides a powerful mechanism to dynamically control which **Lambda function version** is invoked based on the stage environment, making deployments more flexible and efficient.