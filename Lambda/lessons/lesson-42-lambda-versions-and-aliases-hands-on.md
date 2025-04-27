# **Practicing AWS Lambda Versions and Aliases**

In this hands-on practice session, we explored how to **create versions** and **manage aliases** in **AWS Lambda**. This process allows developers to control the evolution of their Lambda functions while providing stable access points for users.

## **Step 1: Creating and Publishing Lambda Versions**

- **Create the Lambda Function**:
  - Name: `lambda-version-demo`
  - Runtime: **Python 3.8**

- **Initial Code**:
  - Simple return statement:
    ```python
    return "this is version one."
    ```

- **Deployment and Testing**:
  - Deploy the code.
  - Create a sample event to test.
  - Confirm the output: `"this is version one."`

- **Publishing Version 1**:
  - Use the **"Actions" → "Publish new version"** option.
  - Add a description (optional).
  - After publishing, **Version 1** is created and **immutable**.
  - Testing confirms it still returns: `"this is version one."`

- **Making Changes for Version 2**:
  - Edit the function code:
    ```python
    return "this is version two."
    ```
  - Deploy and test to confirm output: `"this is version two."`
  - **Publish** this update as **Version 2**.

> **Note**: Published versions cannot be edited; they capture the function state at the time of publishing.

## **Step 2: Creating and Managing Lambda Aliases**

- **Purpose of Aliases**:
  - Provide **stable endpoints**.
  - Allow backend flexibility by pointing aliases to different function versions.

- **Creating Aliases**:
  - **Dev Alias**:
    - Points to **$LATEST** (unpublished version).
    - Used for **ongoing development**.
  - **Test Alias**:
    - Points to **Version 2**.
    - Used for **testing** the stable published code.
  - **Prod Alias**:
    - Initially points to **Version 1**.
    - Used for **production** with the most stable version.

- **Testing Aliases**:
  - Testing the **Dev Alias** reflects the latest changes.
  - Testing the **Test Alias** confirms it executes **Version 2** code.
  - Testing the **Prod Alias** initially confirms it uses **Version 1**.

## **Step 3: Using Weighted Aliases for Canary Deployments**

- **Why Weighted Aliases?**
  - To **gradually shift** traffic between versions during production rollouts.
  - Helps to **test new versions** with a small subset of users before a full deployment.

- **Setting Weights**:
  - Edit the **Prod Alias** to distribute traffic:
    - **50%** to **Version 1**.
    - **50%** to **Version 2** (aggressive distribution for demonstration).
  - Testing shows alternating results:
    - Sometimes returning output from **Version 1**.
    - Sometimes returning output from **Version 2**.

- **Final Promotion**:
  - Once satisfied with Version 2 performance, **edit the Prod Alias** again.
  - Remove weighting and fully point **100% of traffic** to **Version 2**.

## **Key Takeaways**

- **Versions** freeze your code and configuration at a specific point.
- **Aliases** provide flexibility by **pointing to versions** and maintaining stable ARNs.
- **Weighted Aliases** enable **canary deployments**, reducing deployment risks.
- Aliases are **mutable**, but the **versions they point to are immutable**.
