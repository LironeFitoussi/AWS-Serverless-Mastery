# **Understanding AWS Lambda Versions and Aliases**

When working with **AWS Lambda**, it's crucial to understand the concepts of **Versions** and **Aliases**. These features help manage function deployments, enabling controlled updates and stable endpoints for users.

## **Lambda Versions**

- **$LATEST Version**:
  - When developing, you interact with the **$LATEST** version.
  - It is **mutable**, meaning you can continuously edit **code**, **environment variables**, and **configuration**.

- **Publishing a Version**:
  - When you are satisfied with your code, you can **publish** it.
  - Publishing creates an **immutable** version (e.g., **V1**, **V2**).
  - **Immutable** means:
    - You cannot change the **code**.
    - You cannot modify **environment variables** or **configuration** after publishing.
  - Each version is assigned a unique **ARN (Amazon Resource Name)**.

- **Versioning Workflow**:
  - Every time you publish, the version number **increments**.
  - Published versions are independent and maintain the state of your Lambda function at the time of publishing.

> **Important**: Published versions are static snapshots and cannot be modified post-publication.

## **Lambda Aliases**

- **Definition**:
  - **Aliases** are **mutable pointers** to specific Lambda versions.
  - They provide **stable endpoints** for users while allowing backend flexibility.

- **Alias Use Cases**:
  - Define separate environments like **DEV**, **TEST**, and **PROD**:
    - **DEV Alias** → points to **$LATEST** for active development.
    - **TEST Alias** → points to a specific version like **V2** for testing.
    - **PROD Alias** → points to a stable version like **V1** for production.

- **Benefits of Aliases**:
  - Allow continuous updates without disrupting users.
  - Provide a **consistent ARN** for client applications.
  - Enable **safe deployments** and **environment isolation**.

- **Canary Deployments with Aliases**:
  - Assign **weights** to distribute traffic between versions.
  - Example:
    - **95%** of traffic goes to **V1**.
    - **5%** of traffic goes to **V2**.
  - This allows gradual rollout of new versions, minimizing the risk of full-scale failures.

- **Alias Rules**:
  - An **Alias** can only reference a **Version**.
  - **Aliases cannot reference other Aliases** (important for certification exams and real-world implementations).

## **Key Takeaways**

- **Use Versions** to lock in your Lambda code and configuration snapshots.
- **Use Aliases** to create flexible, user-facing endpoints that can be updated safely.
- **Leverage weighted Aliases** for safer, controlled **canary deployments**.
