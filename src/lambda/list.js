import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export const handler = async (event) => {
    try {
        const params = { TableName: `${process.env.DYNAMODB_TABLE}-${process.env.SLS_STAGE}` };
        const response = await ddbDocClient.send(new ScanCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(response.Items)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};