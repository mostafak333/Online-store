import database from '../database';
import bcrypt from 'bcrypt';
export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
};

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;

export class UserClass {
  async index(): Promise<User[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }
  async show(id: string): Promise<User[]> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM users WHERE id=($1) ';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get user with id=${id}. Error: ${error}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await database.connect();
      const sql =
        'INSERT INTO users ("firstName","lastName",password) VALUES($1,$2,$3) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash
      ]);
      const finalResult = result.rows[0];
      conn.release();
      return finalResult;
    } catch (error) {
      throw new Error(
        `Could not create user with name = ${user.firstName}. Error: ${error}`
      );
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM users WHERE id =($1)';
      await conn.query(sql, [id]);
      conn.release();
      return 'user deleted successfully! 👍';
    } catch (error) {
      throw new Error(`Could not delete user ${id}. Error: ${error}`);
    }
  }
  async update(user: User, id: string): Promise<string> {
    try {
      const conn = await database.connect();
      const sql = `UPDATE users SET "firstName" = ($1),"lastName" = ($2),password=($3)  WHERE id =${id}`;
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );
      await conn.query(sql, [user.firstName, user.lastName, hash]);
      conn.release();
      return 'user updated successfully! 👍';
    } catch (error) {
      throw new Error(`Could not update user ${id}. Error: ${error}`);
    }
  }
}
