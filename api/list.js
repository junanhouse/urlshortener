'use strict'
const response = require('./response')
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'myurltable',
};

module.exports.list = async (event, context, callback) => {
  try {
    const result = await dynamoDb.scan(params).promise();
    return response._200(result.Items);
  } catch(error) {
    return response._500(error);
  }
}
