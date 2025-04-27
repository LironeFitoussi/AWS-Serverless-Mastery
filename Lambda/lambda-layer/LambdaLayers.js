// Import a library for working with tabular data (optional)
// You could use a library like 'pandas-js' or 'danfojs' but here we'll use simple native JS

// Import the 'danfojs' library
import * as df from 'danfojs';
// Import UUID package
import { v4 as uuidv4 } from 'uuid';

// Lambda function to process and filter data
export const lambdaHandler = async (event, context) => {
    try {
        // Sample Data
        const data = {
            Name: ["Alice", "Bob", "Charlie", "David"],
            Age: [25, 30, 35, 40],
            City: ["New York", "Los Angeles", "Chicago", "Houston"]
        };

        // Create an array of objects with UUIDs
        const dataArray = data.Name.map((name, index) => ({
            id: uuidv4(), // Add unique UUID for each record
            Name: name,
            Age: data.Age[index],
            City: data.City[index]
        }));

        // Filter Data (Example: People older than 30)
        const filteredData = dataArray.filter(person => person.Age > 30);

        // Return the result in a proper Lambda response format
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Data processed successfully',
                data: filteredData
            })
        };
    } catch (error) {
        // Handle any errors that might occur
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error processing data',
                error: error.message
            })
        };
    }
};
  