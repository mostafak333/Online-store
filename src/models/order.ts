import database from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};
export type OrderProduct = {
  id?: string;
  quantity: string;
  order_id: string;
  product_id: string;
};

export class OrderClass {
  async index(): Promise<Order[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }
  async show(id: string): Promise<Order[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1) ';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get order with id=${id}. Error: ${error}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await database.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not add new order with id = ${order.id}. Error: ${error}`
      );
    }
  }
  async addProduct(
    quantity: string,
    orderId: string,
    productId: string
  ): Promise<OrderProduct[]> {
    // get orders that is active
    /* try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await database.connect();
      const result = await conn.query(ordersql, [orderId]);
      const order = result.rows[0];
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product with id = ${productId} to order with id = ${orderId} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (error) {
      throw new Error(`${error}`);
    }*/
    try {
      const conn = await database.connect();
      const sql =
        'INSERT INTO order_products (quantity ,order_id ,product_id) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not add product with id = ${productId} to order with id = ${orderId}, ${error}`
      );
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM orders WHERE id =($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return 'Order deleted successfully! 👍';
    } catch (error) {
      throw new Error(`Could not delete order ${id}. Error: ${error}`);
    }
  }
}
