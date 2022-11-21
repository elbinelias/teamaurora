// app.js 
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.json({ strict: false }));
// Create User endpoint
app.post('/rule', function (req, res) {
  const { userId, name, reflen, primary, secondary } = req.body;
const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
      reflen: reflen,
      primary: primary,
      secondary: secondary
    },
  };
dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not create rule ${userId}` });
    }
    res.json({ userId, name });
  });
})
// Get User endpoint
app.get('/rule/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not get rule ${userId}` });
    }
    if (result.Item) {
      const {userId, name, reflen, primary, secondary} = result.Item;
      res.json({ userId, primary, secondary });
    } else {
      res.status(404).json({ error: `Rule ${userId} not found` });
    }
  });
})
module.exports.server = sls(app)