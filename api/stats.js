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
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the list',
            });
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({ "stat" : result.Item.stats })
        };
        callback(null, response);
    })
}
