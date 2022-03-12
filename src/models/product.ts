import express from 'express';
import database from '../database';

export type Product = {
  id?: string;
  name: string;
  price: string;
  category: string;
};

export class ProductClass {
  async index(): Promise<Product[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  }
  async show(id: string): Promise<Product[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM products WHERE id =($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get product with id = ${id}. Error: ${error}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await database.connect();
      const sql =
        'INSERT INTO Products (name,price,category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add new product. Error: ${error}`);
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM products WHERE id =($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return 'product deleted successfully! 👍';
    } catch (error) {
      throw new Error(`Could not get product with id = ${id}. Error: ${error}`);
    }
  }
  async update(product: Product, id: string): Promise<string> {
    try {
      const conn = await database.connect();
      const sql = `UPDATE Products SET Name= ($1), price= ($2),category= ($3)  WHERE id =${id}`;
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return 'product updated successfully! 👍';
    } catch (error) {
      throw new Error(`Could not add new product. Error: ${error}`);
    }
  }
}
