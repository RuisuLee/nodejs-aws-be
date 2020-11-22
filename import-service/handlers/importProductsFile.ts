import { APIGatewayProxyHandler } from "aws-lambda";
import { S3 } from "aws-sdk";

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  const fileName = event.queryStringParameters.name;
  const filePath = `uploaded/${fileName}`;

  console.log(`Upload file with filename: ${filePath}`);

  const s3 = new S3({ region: 'eu-west-1' });
  const params = {
    Bucket: 'cake-bakery-app-import-service',
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);

    console.log(`Url has been created: ${url}`);

    return {
      statusCode: 200,
      body: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  } catch (error) {
    console.log(`Error occurred`);

    return {
      statusCode: 500,
      body: 'Something went wrong',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  }
}