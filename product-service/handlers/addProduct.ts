import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';
import { CORSHeaders } from '../services/constant.service';

export const addProduct: APIGatewayProxyHandler = async (event, _context) => {
  const productsService = new ProductsService();
  try {
    const product = JSON.parse(event.body);
    console.log(`addProduct lambda | body product: ${product}`);
    await productsService.addProduct(product);
    return {
      statusCode: 200,
      body: '',
      headers: CORSHeaders
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Something went wrong',
      headers: CORSHeaders
    };
  }
}