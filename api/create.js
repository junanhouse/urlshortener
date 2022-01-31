'use strict'
const AWS = require('aws-sdk');
const { randomUUID } = require('crypto');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    if (typeof data.url !== 'string'){
        console.error('Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain'},
            body: 'Couldn\'t create the url item',
        });
        return;
    }
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
    dynamoDb.put(params, (error) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain'},
                body: data,
            });
            return;
        }
        const response = {
            statusCode : 200,
            body: JSON.stringify(params.Item),
        }
        callback(null,response);
    });
}
