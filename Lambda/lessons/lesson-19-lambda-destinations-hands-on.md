# Hands-On Practice: AWS Lambda Destinations

Let's walk through how to **configure Lambda Destinations** for both **success** and **failure** outcomes when using an S3-triggered Lambda function.

---

## Step 1: Create SQS Queues for Destinations

First, we need two SQS queues:
- **S3-success**: for successful Lambda invocations.
- **S3-failure**: for failed Lambda invocations.

**Actions:**
1. Go to **Amazon SQS**.
2. Create a queue named `S3-success`.
3. Create another queue named `S3-failure`.

---

## Step 2: Configure Destinations in the Lambda Function

**Actions:**
1. Open the Lambda function triggered by your S3 bucket.
2. Navigate to the **Configuration** tab → **Destinations** section.
3. Add a **destination** for asynchronous invocation:
   - **Condition**: `On Failure`
   - **Destination Type**: `SQS Queue`
   - **Destination**: `S3-failure`
4. Save the changes.

> **Note:**  
> The Lambda console will **automatically update the execution role permissions** to allow the function to write to the SQS queue.

5. Add another **destination**:
   - **Condition**: `On Success`
   - **Destination Type**: `SQS Queue`
   - **Destination**: `S3-success`
6. Save again.

**Permissions:**  
Confirm that your Lambda function's IAM role now includes permissions to send messages to `S3-success` and `S3-failure` queues.

---

## Step 3: Test the Success Scenario

**Actions:**
1. Go to **Amazon S3** and open the relevant bucket.
2. Upload a file (e.g., `beach.jpeg`).
3. After the upload:
   - Lambda is triggered.
   - The function processes successfully.
4. Go to **Amazon SQS → S3-success queue**.
5. Refresh the queue and poll for messages.

**Message Body Details:**
- Event source information (e.g., S3 object created).
- Response payload (status code, body).
- Request context metadata.

---

## Step 4: Test the Failure Scenario

**Actions:**
1. Modify the Lambda function code to **raise an exception**:
   ```python
   raise Exception("boom!")
   ```
2. Deploy the updated function.
3. Go back to **Amazon S3** and upload a new file (e.g., `index.html`).
4. After the upload:
   - Lambda is triggered but now raises an exception.
   - **Asynchronous invocations** retry **twice** before moving to the failure destination.

**Important:**  
Because retries happen, the failure message **won’t appear immediately** in the S3-failure queue. Wait a few minutes.

5. After retries are exhausted, check **Amazon SQS → S3-failure queue**.

**Message Body Details:**
- Error message: `"boom!"`
- Error type and stack trace.
- Event source and request context.
- Invoke count (shows retries happened).

---

## Key Takeaways

- **Destinations** allow separate handling of **successes** and **failures**.
- They pack **detailed diagnostic information** into SQS or SNS messages.
- **Permissions** for destinations are updated automatically by the Lambda console.
- Destinations are **more flexible** than Dead Letter Queues (DLQs).

---

## Coming Next
The next lecture will dive deeper into real-world use cases and best practices using Lambda Destinations.

---
