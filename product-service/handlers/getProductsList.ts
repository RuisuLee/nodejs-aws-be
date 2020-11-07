import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/products.service';
import { CORSHeaders } from '../services/constant.service';

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  const productsService = new ProductsService();
  const products = productsService.getAllProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(products),
    headers: CORSHeaders
  };
}
