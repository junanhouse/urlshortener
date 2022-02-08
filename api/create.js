'use strict'
const response = require('./response');
const AWS = require('aws-sdk');
const { randomUUID } = require('crypto');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.create = async (event, context, callback) => {
    if (!event.body) return response._400('Missing event.body');
    const data = JSON.parse(event.body);
    if(data.url.match(/https?:\/\//g) !== true){
        data.url = 'https://' + data.url
    }
    const params = {
        TableName: 'myurltable',
        Item:{
        id: uuid.v1(),
        url: data.url,
        stats: 0
        }
    }
    try {
        await dynamoDb.put(params).promise()
        return response._200(params.Item)
    } catch(error){
        console.log(error)
        return response._500(error)
    }
}

