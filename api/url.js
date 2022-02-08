'use strict'
const response = require('./response');
const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const { Console } = require('console');
const { object } = require('joi');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.url = async (event, context, callback) => {
    const params = {
      TableName: 'myurltable',
      Key: {
          id: event.pathParameters.id,
      },  
  };
    const updateparams = {
        TableName: 'myurltable',
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeValues: {
            ":count": 1
        },
        ExpressionAttributeNames:{
            "#a" : 'stats'
        },
        UpdateExpression: "set #a = #a + :count",
        ReturnValues: "UPDATED_NEW"
    }
    try{
        const result = await dynamoDb.get(params).promise()
        if(Object.keys(result).length === 0) return response._400('Invalid Value');
        await dynamoDb.update(updateparams).promise();
        return response._301(result.Item.url);
    }catch (error){
        return response._500(error);
    }
}

