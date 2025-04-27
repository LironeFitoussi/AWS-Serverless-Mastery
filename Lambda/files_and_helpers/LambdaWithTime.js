const connectToDB = () => {
  // Simulate a slow database connection
  return new Promise((resolve) => {
    setTimeout(() => resolve("Database connected"), 5000);
  });
};

connectToDB();

// Lambda function to return environment name
export const handler = async (event) => {
  // Sleep for 5 seconds
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Lambda function executed successfully",
      event: event,
    }),
  };
};