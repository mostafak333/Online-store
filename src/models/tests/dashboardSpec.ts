import { DashboardQuerisClass } from '../../services/dashboard';
import { OrderClass } from '../order';
import { ProductClass } from '../product';
import bcrypt, { hash } from 'bcrypt';
import { UserClass } from '../user';

const dashboardClass = new DashboardQuerisClass();
const prodcutClass = new ProductClass();
const orderClass = new OrderClass();
const userClass = new UserClass();

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;

describe('DashBoard Model', () => {
  it('Should have an Top-5-Popular-Products method', () => {
    expect(dashboardClass.top5Popular).toBeDefined();
  });
  it('Should have an Top-5-Selling-Products method', () => {
    expect(dashboardClass.top5Seling).toBeDefined();
  });
  it('Should have an Orders-Made-By-User method', () => {
    expect(dashboardClass.orderByUser).toBeDefined();
  });
  it('Should have an Completed-Orders-Made-By-User method', () => {
    expect(dashboardClass.completedOrders).toBeDefined();
  });
  it('Should have an Get-Prodcts-By-Category method', () => {
    expect(dashboardClass.getProdctsByCategory).toBeDefined();
  });
});

describe('DashBoard Model Functions', () => {
  beforeAll(async () => {
    const hash = bcrypt.hashSync(
      '123' + pepper,
      parseInt(saltRounds as string)
    );
    await userClass.create({
      firstName: 'ftest',
      lastName: 'ltest',
      password: hash
    });
    await prodcutClass.create({
      name: 'ptest',
      price: '200',
      category: 'men'
    });
    await orderClass.create({
      status: 'complete',
      user_id: '1'
    });
    await orderClass.create({
      status: 'active',
      user_id: '2'
    });
    await orderClass.addProduct('200', '2', '1');
  });
  it('top5Popular Method -> Top-5-Popular-Products', async () => {
    const result = await dashboardClass.top5Popular();
    expect(result[0]).toEqual({
      name: 'ptest',
      price: 200 as unknown as string,
      sum: '200',
      product_id: '1'
    });
  });
  it('top5Selling Method -> Top-5-Selling-Products', async () => {
    const result = await dashboardClass.top5Seling();

    expect(result[0]).toEqual({
      name: 'ptest',
      price: 200 as unknown as string,
      sum: '40000',
      product_id: '1'
    });
  });
  it('getProdctsByCategory Method -> Retrive Product with its category ', async () => {
    const result = await dashboardClass.getProdctsByCategory('men');
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      name: 'ptest',
      price: 200 as unknown as string,
      category: 'men'
    });
  });
  it('orderByUser Method -> Retrive Orders made by a specific user with id', async () => {
    const result = await dashboardClass.orderByUser('1');
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      status: 'complete',
      user_id: '1'
    });
  });
  it('completedOrders Method -> Retrive Orders made by a specific user with id and status = complete ', async () => {
    const result = await dashboardClass.completedOrders('1');
    expect(result[0]).toEqual({
      id: 1 as unknown as string,
      status: 'complete',
      user_id: '1'
    });
  });
});
