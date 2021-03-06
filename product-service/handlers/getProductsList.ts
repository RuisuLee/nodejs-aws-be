import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';
import { CORSHeaders } from '../services/constant.service';

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  const productsService = new ProductsService();
  console.log(`getProductsList lambda`);
  try {
    const products = await productsService.getAllProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
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
