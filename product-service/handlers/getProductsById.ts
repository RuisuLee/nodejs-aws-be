import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';
import { CORSHeaders } from '../services/constant.service';

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
  const productsService = new ProductsService();
  const { productId } = event.pathParameters;
  console.log(`getProductsById lambda | query params product id: ${productId}`);
  try {
    const product = await productsService.getProductById(productId);
    if (product.length === 0) {
      return {
        statusCode: 404,
        body: 'Product not found',
        headers: CORSHeaders
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(product),
        headers: CORSHeaders
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Something went wrong',
      headers: CORSHeaders
    };
  }
}
