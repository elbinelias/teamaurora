var AWS = require("aws-sdk");
// Set the AWS Region.
AWS.config.update({ region: "ap-southeast-2" });

// Create DynamoDB service object.
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const params = {
  // Specify which items in the results are returned.
  FilterExpression: "RefLength = :s",
  // Define the expression attribute value, which are substitutes for the values you want to compare.
  ExpressionAttributeValues: {
    ':s': {N: '30'}
  },
  // Set the projection expression, which are the attributes that you want.
  ProjectionExpression: "RefLength, PrimarySystem, SecondarySystem",
  TableName: "SystemsRule",
};

ddb.scan(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
    data.Items.forEach(function (element, index, array) {
      console.log(element.RefLength.N,element.PrimarySystem.S,element.SecondarySystem.S);
    });
  }
});