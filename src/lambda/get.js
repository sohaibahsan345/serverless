import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export const handler = async (event) => {
    try {
        const params = {
            Key: {
                id: event.pathParameters.id
            },
            TableName: `${process.env.DYNAMODB_TABLE}-${process.env.SLS_STAGE}`
        };
        const response = await ddbDocClient.send(new GetCommand(params));
        if (!response.Item) {
            throw new Error("Item not found !");
        }
        return {
            statusCode: 200,
            body: JSON.stringify(response.Item)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};