# **Deploying AWS Lambda Functions Using Container Images**

AWS Lambda now supports deploying **functions as container images**, introducing new possibilities for handling **large and complex applications**. This enhancement allows Lambda functions to be packaged into container images of up to **10 GB**, stored in **Amazon ECR (Elastic Container Registry)**.

## **Key Concepts**

- **Containerization**: 
  - Lambda functions can now be built and deployed as container images.
  - Ideal for applications requiring **complex dependencies** or **large datasets**.
  - Containers combine **application code**, **dependencies**, and **data** on top of a **base image**.

- **Base Image Requirements**:
  - Must **implement the Lambda Runtime API**.
  - Available for multiple languages: **Python, Node.js, Java, .NET, Go, and Ruby**.
  - Developers can also create **custom base images**, as long as they implement the Lambda Runtime API.
  - AWS documentation provides specifications for building custom images.

- **Local Testing**:
  - Use the **Lambda Runtime Interface Emulator** to test containerized Lambda functions locally.

- **Unified Deployment Workflow**:
  - Containers can be built and published similarly for both **ECS** and **Lambda**.
  - Use **Amazon ECR** to store and manage container images for deployment.

## **Building a Lambda Container Image: Step-by-Step Example**

1. **Choose a Base Image**:
   - Example: `amazon/aws-lambda-nodejs:12` (for Node.js 12).

2. **Copy Application Code**:
   - Include files like `app.js`, `package.json`, and other resources into the container.

3. **Install Dependencies**:
   - Run `npm install` inside the container to add necessary packages.

4. **Specify the Lambda Handler**:
   - Define the entry point using a command like `app.lambdaHandler`.

Once built correctly using the AWS base image, your Docker image will run seamlessly on Lambda without extra configuration or dependency compilation.

## **Best Practices for Lambda Container Images**

- **Use AWS-Provided Base Images**:
  - Built on **Amazon Linux 2**.
  - Already cached by Lambda for **faster startup** and **reduced pull times**.

- **Apply Multi-Stage Builds**:
  - Build artifacts in one stage.
  - Copy only the necessary output to a **final minimal image**.
  - Results in **smaller**, **simpler**, and **more efficient** container images.

- **Organize Image Layers Thoughtfully**:
  - Place **stable layers** (e.g., base OS, base packages) early.
  - Put **frequently changing layers** (e.g., application code) at the end.
  - Reduces rebuild times and improves cache usage.

- **Use a Single ECR Repository for Large Layers**:
  - Helps avoid **duplicate storage**.
  - ECR can efficiently compare layers to optimize storage and upload.

## **When to Use Lambda Container Images**

- **Handling Very Large Applications**:
  - If your Lambda function exceeds the standard deployment size limits.
  - Allows for functions **up to 10 GB** in size.
  - A great alternative to using **Lambda Layers** for managing large dependencies.

