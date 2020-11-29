import 'source-map-support/register';
import { getProductsById } from './handlers/getProductsById';
import { getProductsList } from './handlers/getProductsList';
import { addProduct } from './handlers/addProduct';
import { catalogBatchProcess } from './handlers/catalogBatchProcess';

export { getProductsById, getProductsList, addProduct, catalogBatchProcess };