# ⏰ Integrating AWS Lambda with CloudWatch Events (EventBridge)

AWS **EventBridge** (formerly CloudWatch Events) is a powerful event bus that lets you trigger **Lambda functions** in response to **time-based schedules** or **AWS service events**.

---

## 🔄 Integration Use Cases

### 1. **Scheduled Invocations (Serverless CRON or Rate)**
- Use **rate expressions** (`rate(1 hour)`) or **cron expressions** to trigger Lambda periodically.
- Example:
  - Run a cleanup task **every hour**
  - Send a daily email summary **at midnight**

### 2. **AWS Event-Driven Triggers (e.g., CodePipeline State Changes)**
- Trigger Lambda functions on specific **AWS service events**.
- Example:
  - React to **CodePipeline state changes**
  - Run a function when a **pipeline succeeds or fails**

---

## ⚙️ How It Works

- You define an **EventBridge rule**.
- The rule listens to either:
  - A **scheduled event**
  - A **specific AWS event pattern**
- When matched, the rule invokes your **Lambda function asynchronously**.

---

## 🧪 What’s Next?

In the **hands-on** section, you'll:
- Create a scheduled EventBridge rule (e.g., run every hour).
- Create a service event-based rule (e.g., respond to CodePipeline events).
- Link the rules to your Lambda function.
- Verify that your Lambda executes as expected via **CloudWatch Logs**.

---

## 📝 Summary

| Use Case                     | EventBridge Rule Type         | Invocation Type |
|------------------------------|-------------------------------|------------------|
| Recurring tasks (CRON/RATE)  | Schedule rule                 | Asynchronous     |
| AWS service state changes    | Event pattern (e.g., CodePipeline) | Asynchronous     |

---

> 🔔 EventBridge makes it easy to connect events to Lambda for automation, monitoring, and operational logic—all without provisioning infrastructure.

🎯 Up next: Let's build and test these rules in a hands-on walkthrough!
