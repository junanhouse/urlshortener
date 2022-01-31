'use strict'
const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
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
                statusCode: error.statusCode || 501,
                headers: {'Content-type': 'text/plain'},
                body: 'Couldn\'t fetch the item',
            });
        }
    })

  dynamoDb.get(params, (error,result) =>{
      if(error) {
          callback(null, {
              statusCode: error.statusCode || 501,
              headers: {'Content-Type': 'text/plain'},
              body: 'Couldn\'t fetch the item',
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

