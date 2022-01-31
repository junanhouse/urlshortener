'use strict'
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();



module.exports.stats = (event, context, callback) => {
    const params = {
        TableName: 'myurltable',
        Key: {
            id: event.pathParameters.id,
        },
    };
    dynamoDb.get(params, (error, result) => {
        if (Object.keys(result).length === 0) {
            callback(null, {
                statusCode: 400,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Invalid value',
            });
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({ "visit" : result.Item.stats })
        };
        callback(null, response);
    })
}
