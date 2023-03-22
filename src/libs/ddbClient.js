import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT
});
export { ddbClient };