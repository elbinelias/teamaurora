var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'SystemsRule',
  Item: {
    'ID' : {N: '001'},
    'RefLength' : {N: '30'},
    'PrimarySystem' : {S: 'BIFAST'},
    'SecondarySystem' : {S: 'GCP'}
  },
  Item: {
    'ID' : {N: '002'},
    'RefLength' : {N: '9'},
    'PrimarySystem' : {S: 'GCP'},
    'SecondarySystem' : {S: 'BIFAST'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});