# **Integrating AWS Lambda with CodeDeploy for Traffic Shifting**

AWS Lambda integrates natively with **AWS CodeDeploy** to manage **automated traffic shifting** between function versions, leveraging **aliases** for smooth and controlled deployments.

While this lecture provides a **conceptual overview**, hands-on practice will come later in the **Serverless Application Model (SAM)** section.

## **How Lambda Traffic Shifting Works with CodeDeploy**

- **Starting Point**:
  - You have a **PROD Alias** currently pointing to **Version 1**.
  - You want to **upgrade** to **Version 2** gradually.

- **Traffic Shifting Process**:
  - CodeDeploy manages the percentage (X%) of traffic sent to the new version.
  - It starts with a small portion (e.g., **10% to V2**, **90% to V1**).
  - Gradually increases traffic to V2 until **100%** of the traffic moves to Version 2.

## **Traffic Shifting Strategies**

CodeDeploy offers multiple predefined deployment strategies:

- **Linear Deployments**:
  - **Linear10PercentEvery3Minutes**:
    - Increase traffic by **10%** every **3 minutes** until 100%.
  - **Linear10PercentEvery10Minutes**:
    - Increase traffic by **10%** every **10 minutes**.

- **Canary Deployments**:
  - **Canary10Percent5Minutes**:
    - Shift **10%** traffic to V2.
    - After **5 minutes**, shift **100%** traffic to V2.
  - **Canary10Percent30Minutes**:
    - Shift **10%** traffic initially.
    - After **30 minutes**, shift **100%** traffic to V2.

- **All-at-Once Deployment**:
  - **AllAtOnce**:
    - Switch **100% of traffic immediately** from V1 to V2.
    - Fast but **high risk** if V2 is not well tested.

> **Warning**: "AllAtOnce" is the riskiest approach since it doesn't allow gradual rollback in case of failure.

## **Rollback Mechanism**

- **Pre-Traffic and Post-Traffic Hooks**:
  - You can configure **hooks** to verify the health of the new Lambda version.
  - Hooks can trigger **CloudWatch alarms** or **custom health checks**.
  - If a hook or alarm fails:
    - **CodeDeploy automatically rolls back** the deployment.
    - Traffic is reverted back to the previous stable version (**V1**).

## **Important Parameters in AppSpec.yml for Lambda Deployments**

When using **AppSpec.yml** with CodeDeploy to manage Lambda deployments, these parameters are crucial:

| Parameter         | Description |
|-------------------|-------------|
| **Name**           | The name of the Lambda function to deploy. |
| **Alias**          | The alias name associated with the Lambda function. |
| **CurrentVersion** | The version that currently handles all traffic. |
| **TargetVersion**  | The new version to which the traffic will gradually shift. |

> **CodeDeploy** automatically updates the alias pointer from **CurrentVersion** to **TargetVersion** based on the chosen traffic shifting strategy.

---

# **Summary**

- **AWS CodeDeploy** enhances Lambda deployments by providing **safe, gradual traffic shifts**.
- **Traffic shifting** strategies (Linear, Canary, AllAtOnce) cater to different risk tolerances.
- **Rollback mechanisms** ensure quick recovery in case of deployment failures.
- Configuration with **AppSpec.yml** defines the details of the deployment process.