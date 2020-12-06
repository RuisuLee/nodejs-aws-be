import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import 'source-map-support/register';

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = (event, _context, callback) => {
  console.log('Event | ', JSON.stringify(event));

  if (event['type'] !== 'TOKEN') {
    callback('Unauthorized');
    return;
  }

  try {
    const { authorizationToken, methodArn } = event;
    const authScheme = authorizationToken.split(' ')[0];
    const encodedCreds = authorizationToken.split(' ')[1];

    if (authScheme !== 'Basic' || !encodedCreds) {
      callback('Unauthorized');
      return;
    }

    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username} | password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, methodArn, effect);

    callback(null, policy);
  } catch (error) {
    console.log(`basicAuthorizer error: ${error}`);
    callback(`Unauthorized: ${error.message}`);
  }
}

const generatePolicy = (principalId, resource, effect = "Allow"): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      }
    ]
  },
});
