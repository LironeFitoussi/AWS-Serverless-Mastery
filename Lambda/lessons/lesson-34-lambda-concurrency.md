# **AWS Lambda: Concurrency, Throttling, and Cold Starts**

## **Understanding Lambda Concurrency**

AWS **Lambda** scales automatically based on incoming events. As a result:
- **Low event volume** → few concurrent executions (e.g., 2 executions).
- **High event volume** → potentially **up to 1000** concurrent executions by default.

**Concurrency** refers to the number of Lambda instances running simultaneously.

---

## **Managing Concurrency with Reserved Concurrency**

You can control concurrency by setting a **Reserved Concurrency** limit at the **function level**.

- **Example:** Set a Lambda function to allow only **50 concurrent executions**.
- If invocations exceed the limit, the Lambda function will be **throttled**.

### **Throttling Behavior**
- **Synchronous invocations**: Return a **429 (Throttle) error** immediately.
- **Asynchronous invocations**:  
  - **Automatic retries** occur.  
  - If retries fail after a while, events are sent to the **Dead Letter Queue (DLQ)** if configured.

> **Note:** If you require more than **1000 concurrent executions**, you must request a **service limit increase** through an AWS Support ticket.

---

## **Why Reserved Concurrency Matters**

If you don't set **reserved concurrency** for your Lambda functions, you risk **resource contention**:

- Imagine:
  - An **Application Load Balancer (ALB)** invokes one Lambda function.
  - **API Gateway** and **CLI/SDK applications** invoke other Lambda functions.
- During a **traffic surge** (e.g., a promotion), the ALB could **consume all 1000 concurrency slots**.
- **Result:**  
  - Other Lambda functions (API Gateway, CLI) **get throttled**.
  - Poor user experience.

> **Key takeaway:**  
> Lambda concurrency limits apply **account-wide**.  
> **One function** can monopolize all concurrency and **starve** others.

---

## **Concurrency and Asynchronous Invocations**

When using services like **S3 Event Notifications**:
- Uploading multiple files triggers **many concurrent Lambda executions**.
- If concurrency limits are reached:
  - Additional requests are **throttled**.
  - **Lambda queues** the events internally.
  - Lambda **retries** execution for up to **6 hours**.

### **Retry Strategy**
- Starts with a **1-second delay**.
- Delay increases **exponentially** (up to **5 minutes** between retries).
- Designed to allow **capacity availability** before retrying.

---

## **Cold Starts and Provisioned Concurrency**

### **What is a Cold Start?**
A **cold start** occurs when Lambda must:
- Create a **new instance**.
- Load your **code** and **dependencies**.
- Run any **initialization logic** (outside the handler).

**Impact:**  
The first request to a new instance **has higher latency**, which can hurt user experience.

### **Minimizing Cold Starts with Provisioned Concurrency**

**Provisioned Concurrency** pre-creates Lambda instances before traffic arrives.

- Ensures **no cold starts**.
- Provides **consistent low latency**.
- Managed via **Application Auto Scaling** (e.g., scheduled scaling policies).

> **Good News:**  
> In late 2019, AWS made improvements significantly reducing **cold start times for VPC-configured Lambdas**.

---

## **Summary Table**

| Feature | Description |
|:--------|:------------|
| **Concurrency** | Number of Lambda instances running at the same time |
| **Reserved Concurrency** | Limits concurrency for specific functions to prevent account-wide throttling |
| **Throttling** | Occurs when concurrency limits are exceeded (429 errors) |
| **Cold Start** | Delay when new Lambda instances are initialized |
| **Provisioned Concurrency** | Pre-warms Lambda instances to eliminate cold starts |

---

## **Further Learning**

The instructor recommends reviewing two helpful diagrams explaining **Reserved Concurrency** and **Provisioned Concurrency** — linked in the course slides.
