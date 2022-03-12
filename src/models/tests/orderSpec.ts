import database from '../../database';
import { OrderClass } from '../order';
import { UserClass } from '../user';
import { ProductClass } from '../product';
const prodcutClass = new ProductClass();
const userClass = new UserClass();
const orderClass = new OrderClass();
describe('Order Model', () => {
  it('Should have an Index method', () => {
    expect(orderClass.index).toBeDefined();
  });
  it('Should have an Create method', () => {
    expect(orderClass.create).toBeDefined();
  });
  it('Should have an Show method', () => {
    expect(orderClass.show).toBeDefined();
  });
  it('Should have an Delete method', () => {
    expect(orderClass.delete).toBeDefined();
  });
  it('Should have an Update method', () => {
    expect(orderClass.addProduct).toBeDefined();
  });
});

describe('Order Model Functions', () => {
  afterAll(async () => {
    const conn = await database.connect();
    const sqlOP = 'DELETE FROM order_products;';
    await conn.query(sqlOP);
    const sqlOP2 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
    await conn.query(sqlOP2);
    const sql = 'DELETE FROM orders;';
    await conn.query(sql);
    const sql2 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await conn.query(sql2);
  });

  it('Create Method -> Add Order', async () => {
    const result = await orderClass.create({
      status: 'active',
      user_id: '1'
    });
    expect(result).toEqual({
      id: 1 as unknown as string,
      status: 'active',
      user_id: '1'
    });
  });
  it('Index Method -> Retrive All Orders ', async () => {
    const result = await orderClass.index();
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      status: 'active',
      user_id: '1'
    });
  });
  it('Show Method -> Retrive Order With Spacifec ID', async () => {
    const result = await orderClass.show('1');
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      status: 'active',
      user_id: '1'
    });
  });
  it('Delete Method -> Delete Order With Spacifec ID ', async () => {
    const result = await orderClass.delete('1');
    expect(result).toEqual('Order deleted successfully! 👍');
  });
});
