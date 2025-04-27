# **AWS Lambda Layers Hands-On: Using External Libraries**

In this practice session, we demonstrated **how to use Lambda Layers** to bring **external libraries** (like **Pandas**) into a Lambda function without packaging them manually.

---

# **Scenario Overview**

We aim to create a **Lambda function** that uses the **Pandas** library for data manipulation. However, because Lambda doesn’t include Pandas by default, we’ll add it through a **Lambda Layer**.

---

# **Step-by-Step Walkthrough**

## **Step 1: Create a Lambda Function**

- Go to the **AWS Lambda Console**.
- Create a new function:
  - **Name**: `Lambda-layer-demo`
  - **Runtime**: Python 3.13 (or latest available version)
- Scroll down and click **Create Function**.

---

## **Step 2: Add Application Code**

- Open the function editor.
- Paste the provided code from `layer-demo-panda.py`.
- The code:
  - **Imports** the **Pandas** library.
  - **Creates sample data**.
  - **Filters** the data where **age > 30**.

**Note**:  
Pandas is used for **data manipulation**, but detailed Pandas knowledge isn't required here.

---

## **Step 3: Deploy and Test (Expect Initial Failure)**

- Click **Deploy** to save the code changes.
- Create a **Test event** and **Run it**.
- **Result**:  
  - **Error** — Lambda cannot find the **pandas** module.

✅ This is expected because Pandas is **not bundled** with the Lambda runtime by default.

---

## **Step 4: Add a Lambda Layer for Pandas**

- Under your Lambda function:
  - Click on the **Layers** tab.
  - Click **Add a Layer**.
- **Choose an AWS Provided Layer**.
- Find and select:
  - **Layer Name**: `AWSSDKPandas-Python313`
  - **Version**: Version 1 (or latest)
- Click **Add**.

✅ This AWS-provided layer contains Pandas, pre-packaged to run inside Lambda.

---

## **Step 5: Test Again (Expect Success)**

- Go back to your function's **Test** tab.
- Run the test again.

**Result**:
- The function now **executes successfully**.
- Sample data is filtered properly:  
  - Only entries where **age > 30** are returned.

✅ The Pandas library is now **available** via the Lambda layer!

---

# **Key Takeaways**

| Step                          | Purpose                                                      |
|--------------------------------|---------------------------------------------------------------|
| **Create Function**            | Initialize a new Lambda function with Python runtime.         |
| **Add Application Code**       | Code that depends on external libraries like Pandas.          |
| **Deploy & Test (Fail)**        | Confirm missing dependency (Pandas not bundled by default).   |
| **Add Lambda Layer**           | Attach a pre-packaged library (Pandas) from AWS-provided layers. |
| **Deploy & Test (Success)**     | Confirm that the function runs successfully with the layer.    |

---

# **Benefits of Using Lambda Layers**


✅ **No need to manually package heavy libraries**.  
✅ **Reuse layers** across multiple functions.  
✅ **Faster deployments** — only function code changes, not dependencies.  
✅ **Simplified management** of third-party libraries in Lambda.
