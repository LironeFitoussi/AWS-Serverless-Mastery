// Lambda function to return environment name
export const handler = async (event) => {
   return process.env.ENVIRONMENT_NAME;
  };
  