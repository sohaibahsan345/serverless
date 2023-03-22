import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export const handler = async (event) => {
    try {
        const timestamp = new Date().getTime();
        const data = JSON.parse(event.body);
        if (!data || !data.text || typeof data.text !== "string") {
            throw new Error("Text is Required !");
        }
        const params = {
            Item: {
                id: uuid(),
                text: data.text,
                createdAt: timestamp,
                updatedAt: timestamp
            },
            TableName: `${process.env.DYNAMODB_TABLE}-${process.env.SLS_STAGE}`
        };
        // Inserting data into database
        await ddbDocClient.send(new PutCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};