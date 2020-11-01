import * as products from '../data/products.json';

export class ProductsService {
  constructor() {}

  public getAllProducts() {
    return products;
  }

  public getProductById(id) {
    return new Promise((resolve, reject) => {
      const productById = products.filter(product => { return product.id === id })[0];
      if (productById) {
        resolve(productById);
      } else {
        reject('Product not found');
      }
    });
  }
}