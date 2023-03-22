import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export const handler = async (event) => {
    try {
        const params = {
            Key: {
                id: event.pathParameters.id
            },
            TableName: `${process.env.DYNAMODB_TABLE}-${process.env.SLS_STAGE}`
        };
        const response = await ddbDocClient.send(new DeleteCommand(params));
        console.log("DEL response", response);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item Deleted Successfully !" })
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};