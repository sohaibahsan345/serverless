import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "./ddbClient.js"
// Create the DynamoDB Document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
export { ddbDocClient };