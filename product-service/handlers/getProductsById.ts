import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
  const productsService = new ProductsService();
  const { productId } = event.pathParameters;
  try {
    const product = await productsService.getProductById(productId);
    return {
      statusCode: 200,
      body: JSON.stringify(product),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  }
}
