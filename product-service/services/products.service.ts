import { Client } from 'pg';
import {
  SELECT_ALL_PRODUCTS_JOIN_WITH_COSTS,
  SELECT_PRODUCT_BY_ID,
  INSERT_PRODUCT,
  INSERT_STOCKS
} from './constant.service';

interface IProduct {
  id: string;
  title: string;
  description: string;
  img: string;
  count: number;
  price: number;
}

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

export class ProductsService {
  public client;

  constructor() {
    this.client = new Client(dbOptions);
  }

  public async getAllProducts() {
    await this.client.connect();
    try {
      const {rows: res} = await this.client.query(SELECT_ALL_PRODUCTS_JOIN_WITH_COSTS);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async getProductById(id) {
    await this.client.connect();
    try {
      const query = {
        text: SELECT_PRODUCT_BY_ID,
        values: [id]
      }
      const {rows: res} = await this.client.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async addProduct(product: IProduct) {
    await this.client.connect();
    const { count, title, description, img, price } = product;
    try {
      const insertToProductsQuery = {
        text: INSERT_PRODUCT,
        values: [title, description, price, img]
      }
      const { rows: createdProducts } = await this.client.query(insertToProductsQuery);
      const insertToStocksQuery = {
        text: INSERT_STOCKS,
        values: [createdProducts[0].id, count]
      }
      const { rows: res } = await this.client.query(insertToStocksQuery);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async addProducts(products: Array<IProduct>) {
    await this.client.connect();
    try {
      await this.client.query('BEGIN');

      let productsString: string = products.reduce((previousValue: string, product: IProduct) =>
        previousValue + `('${product.title}', '${product.description}', '${product.price}', '${product.img}'),`,
        ''
      );
      productsString = productsString.slice(0, -1);
      const productsQueryString: string = `insert into products(title, description, price, img) values${productsString} returning id`;
      console.log('addProducts | productsQueryString: ', productsQueryString);
      const { rows: createdProducts } = await this.client.query(productsQueryString);
      console.log('addProducts | createdProducts: ', createdProducts);

      let stocksString: string = createdProducts.reduce((previousValue: string, product, index: number) =>
        previousValue + `('${product.id}', '${products[index].count}'),`,
        ''
      );
      stocksString = stocksString.slice(0, -1);
      const stocksQueryString: string = `insert into stocks(product_id, count) values${stocksString} returning id`;
      console.log('addProducts | stocksQueryString: ', stocksQueryString);
      const { rows: res } = await this.client.query(stocksQueryString);
      console.log('addProducts | res: ', res);

      await this.client.query('COMMIT');
      return res;
    } catch (error) {
      await this.client.query('ROLLBACK');
    }
  }
}