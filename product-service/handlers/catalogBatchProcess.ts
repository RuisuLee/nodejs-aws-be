import { SQSEvent } from 'aws-lambda';
import { SNS } from "aws-sdk";
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';

export const catalogBatchProcess = async (event: SQSEvent, _context) => {
  console.log(`catalogBatchProcess lambda | Event: ${event}`);
  const productsService = new ProductsService();
  const sns = new SNS({ region: 'eu-west-1' });

  let products = [];
  try {
    products = event.Records.map(({body}) => JSON.parse(body));
    console.log('catalogBatchProcess | products:', products);
    const ids = await productsService.addProducts(products);

    console.log('TopicArn: ', process.env.SNS_ARN);
    sns.publish({
      Subject: "Hey! Some new products were added to database!",
      Message: `You can check it on site: https://d3rz6g0e2mzffy.cloudfront.net/`,
      TopicArn: process.env.SNS_ARN
    },
    (err, data) => {
      if (err) { console.log('Something went wrong durion SNS publish process: ', err) }
      console.log('SNS publish, email has been send: ', data);
    });
  } catch (error) {
    console.log('Something went wrong during adding new products to db: ', error);
  }
}
