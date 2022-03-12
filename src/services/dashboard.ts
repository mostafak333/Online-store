import database from '../database';
import { Order } from '../models/order';
import { Product } from '../models/product';

export class DashboardQuerisClass {
  // Get five Most popular products
  async top5Popular(): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await database.connect();
      const sql = `SELECT name, price,sum(quantity),product_id FROM products INNER JOIN order_products ON products.id = order_products.product_id group by product_id, name,price order by sum(quantity) desc LIMIT 5`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products  ${err}`);
    }
  }
  async orderByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) ';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get order with user id=${user_id}. Error: ${error}`
      );
    }
  }
  async completedOrders(user_id: string): Promise<Order[]> {
    try {
      const conn = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'complete' `;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get order with user id=${user_id}. Error: ${error}`
      );
    }
  }
  async top5Seling(): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await database.connect();
      const sql = `SELECT name, price,sum(quantity*price),product_id FROM products INNER JOIN order_products ON products.id = order_products.product_id group by product_id, name,price order by sum(quantity*price) desc LIMIT 5`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products  ${err}`);
    }
  }
  async getProdctsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM products WHERE category =($1)';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not get product with category = ${category}. Error: ${error}`
      );
    }
  }
}
