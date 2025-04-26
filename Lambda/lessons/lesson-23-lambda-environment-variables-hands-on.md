# Practice: Using Environment Variables in AWS Lambda

Let's practice how to **set up and use environment variables** in a Lambda function.

---

## Step 1: Create a New Lambda Function

- **Name:** `lambda-config-demo`
- **Runtime:** Python 3.8
- **Author from scratch**

---

## Step 2: Modify the Function Code

Update the **Lambda function code** to **read an environment variable**.

```python
import os

def lambda_handler(event, context):
    return os.getenv("ENVIRONMENT_NAME")
```

> **Note:**  
> We use Python’s `os` module to retrieve environment variables with `os.getenv()`.

After editing the code, **Deploy** the function.

---

## Step 3: Configure Environment Variables

1. Go to the **Configuration** tab → **Environment variables**.
2. Click **Edit** and add a new environment variable:
   - **Key:** `ENVIRONMENT_NAME`
   - **Value:** `dev`
3. Save the changes.

> **Reminder:**  
> Encryption options are available but will be covered later in the **Security Section**.  
> For now, the environment variable is **unencrypted**.

---

## Step 4: Test the Lambda Function

1. Create a **Test Event** (no special input needed).
2. Run the test.

**Expected Response:**
```json
"dev"
```

---

## Step 5: Update Environment Variable and Retest

1. Edit the environment variable:
   - Change the value from `dev` to `prod`.
2. Save the changes.
3. Run the test again.

**New Expected Response:**
```json
"prod"
```

> **Important:**  
> Notice that **the code did not change**, only the environment variable did.  
> This demonstrates how **environment variables dynamically alter function behavior** without code updates!

---

## Key Takeaways

- **Environment variables** help **adjust configuration** without touching your function code.
- **Accessing** them inside Lambda is simple with `os.getenv()` (in Python).
- **Changing** environment variables **immediately impacts** your function's output.

---

## Coming Up

In the next section, we'll explore **how to encrypt environment variables** securely using **AWS KMS**.
