'use strict'
const response = require('./response')
const AWS = require('aws-sdk');
const { result } = require('lodash');
const dynamoDb = new AWS.DynamoDB.DocumentClient();



module.exports.stats = async (event, context, callback) => {
    const params = {
        TableName: 'myurltable',
        Key: {
            id: event.pathParameters.id,
        },
    };
    try{
        const result = await dynamoDb.get(params).promise()
        if(Object.keys(result).length === 0) return response._400('Invalid Value');
        const data = {"visit": result.Item.stats}
        return response._200(data);
    }
    catch(error){
        return response._500(error);
    }
}
