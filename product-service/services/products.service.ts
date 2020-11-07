import * as products from '../data/products.json';

export class ProductsService {
  constructor() {}

  public getAllProducts() {
    return products;
  }

  public getProductById(id) {
    return new Promise((resolve, reject) => {
      const productById = products.find(product => { return product.id === id });
      if (productById) {
        resolve(productById);
      } else {
        reject('Product not found');
      }
    });
  }
}