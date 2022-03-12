import database from '../../database';
import { ProductClass } from '../product';
const prodcutClass = new ProductClass();
describe('Product Model', () => {
  it('Should have an Index method', () => {
    expect(prodcutClass.index).toBeDefined();
  });
  it('Should have an Create method', () => {
    expect(prodcutClass.create).toBeDefined();
  });
  it('Should have an Show method', () => {
    expect(prodcutClass.show).toBeDefined();
  });
  it('Should have an Delete method', () => {
    expect(prodcutClass.delete).toBeDefined();
  });
  it('Should have an Update method', () => {
    expect(prodcutClass.update).toBeDefined();
  });
});

describe('Product Model Functions', () => {
  afterAll(async () => {
    const conn = await database.connect();
    const sql = 'DELETE FROM products;';
    await conn.query(sql);
    const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await conn.query(sql2);
    conn.release();
  });
  it('Create Method -> Add Product', async () => {
    const result = await prodcutClass.create({
      name: 'ptest',
      price: '200',
      category: 'men'
    });
    expect(result).toEqual({
      id: 1 as unknown as string,
      name: 'ptest',
      price: 200 as unknown as string,
      category: 'men'
    });
  });
  it('Index Method -> Retrive All Products ', async () => {
    const result = await prodcutClass.index();
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      name: 'ptest',
      price: 200 as unknown as string,
      category: 'men'
    });
  });
  it('Show Method -> Retrive a Product With Spacifec ID', async () => {
    const result = await prodcutClass.show('1');
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      name: 'ptest',
      price: 200 as unknown as string,
      category: 'men'
    });
  });
  it('Delete Method -> Delete Product With Spacifec ID ', async () => {
    const result = await prodcutClass.delete('1');
    expect(result).toEqual('product deleted successfully! 👍');
  });
  it('Update Method -> Update Product With Spacifec ID', async () => {
    const result = await prodcutClass.update(
      {
        name: 'ptest2',
        price: '300',
        category: 'women'
      },
      '1'
    );
    expect(result).toEqual('product updated successfully! 👍');
  });
});
