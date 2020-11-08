export const CORSHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};

export const SELECT_ALL_PRODUCTS_JOIN_WITH_COSTS = `select p.id, p.title, p.description, p.price, p.img, s.count from products p inner join stocks s on p.id = s.product_id`;
export const SELECT_PRODUCT_BY_ID = `select p.id, p.title, p.description, p.price, p.img, s.count from products p inner join stocks s on p.id = s.product_id where p.id = $1`;
export const INSERT_PRODUCT = `insert into products(title, description, price, img) values($1,$2,$3,$4) returning *`;
export const INSERT_STOCKS = `insert into stocks(product_id, count) values($1,$2)`;