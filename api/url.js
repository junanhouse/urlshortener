'use strict'
const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const { Console } = require('console');
const { object } = require('joi');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.url = (event, context, callback) => {
    const params = {
      TableName: 'myurltable',
      Key: {
          id: event.pathParameters.id,
      },  
  };
    const params2 = {
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
    dynamoDb.update(params2, function(err,data){
        if(err) {
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {'Content-type': 'text/plain'},
                body: 'Invalid Value2!!',
            });
        }
    })

  dynamoDb.get(params, (error,result) =>{
      if(Object.keys(result).length === 0) {
          callback(null, {
              statusCode: 400,
              headers: {'Content-Type': 'text/plain'},
              body: 'Invalid Value!!',
          });
          return;
        }
        const data = {
            statusCode: 301,
            headers: {
                Location: result.Item.url
            }
        }
            callback(null, data);
  })

}

