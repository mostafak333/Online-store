import { response } from 'express';
import supertest from 'supertest';
import app from '../../server';
import database from '../../database';
const request: supertest.SuperTest<supertest.Test> = supertest(app);
// test server main endoint with supertest
describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets / (<< Main Router >>)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('SuperTest endpoints', (): void => {
    let token: string;
    beforeAll(async () => {
      const response: supertest.Response = await request
        .post('/users/create')
        .send({
          fname: 'ali',
          lname: 'ahmed',
          pass: 147258
        });
      token = response.body as unknown as string;
      const res: supertest.Response = await request
      .post('/orders/create')
      .send({ status: 'active', user_id: 2 })
      .set('Authorization', 'Bearer ' + token);
    

    });
    afterAll(async ()=>{
        const conn = await database.connect();
    const sqlpro = 'DELETE FROM products;';
    await conn.query(sqlpro);
    const sqlpro2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await conn.query(sqlpro2);
    const sqlOP = 'DELETE FROM order_products;';
    await conn.query(sqlOP);
    const sqlOP2 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
    await conn.query(sqlOP2);
    const sqlorder = 'DELETE FROM orders;';
    await conn.query(sqlorder);
    const sqlorder2 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await conn.query(sqlorder2);
    const sqluser = 'DELETE FROM users;';
    await conn.query(sqluser);
    const sqluser2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sqluser2);
    conn.release();
    })
    // test User endpoints with supertest
    describe('User endpoints', (): void => {
      it('Post /users/create (<< create user >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.post('/users/create').send({
            fname: "ali",
            lname: "ahmed",
            pass: 147258
        })
          token = response.body as unknown as string
          expect(response.status).toBe(200);
        });
      it('GET /users (<< get users >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/users')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /users/show/:id (<< get user with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/users/show/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('PUT /users/update/:id (<< update user with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .put('/users/update/1')
          .send({
            fname: 'mohamed',
            lname: 'ali',
            pass: 123
          })
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('DELETE /users/delete/:id (<< delete user with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .delete('/users/delete/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
    });
    // test Products endpoints with supertest
    describe('Product endpoints', (): void => {
      it('POST /products/create (<< create product >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .post('/products/create')
          .send({ name: 'product1', price: 20, category: 'men' })
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /products (<< get products >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/products');
        expect(response.status).toBe(200);
      });
      it('GET /products/get/:category(<< get product with category >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/products/get/men'
        );
        expect(response.status).toBe(200);
      });
      it('GET /products/show/:id (<< get product with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/products/show/1'
        );
        expect(response.status).toBe(200);
      });
      it('PUT /products/update/:id (<< update product with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .put('/products/update/1')
          .send({ name: 'product11', price: 30, category: 'woman' })
          .set('Authorization', 'Bearer ' + token);
        token;
        expect(response.status).toBe(200);
      });
      it('DELETE /products/delete/:id (<< delete product with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .delete('/products/delete/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
    });
    // test order endpoints with supertest
    describe('orders endpoints', (): void => {
      it('POST /orders/create (<< create order >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .post('/orders/create')
          .send({ status: 'active', user_id: 2 })
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /orders (<< get orders >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/orders')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /orders/show/:id (<< get orders with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/orders/show/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('DELETE /delete/orders/:id/products (<< delete product with id from order >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .delete('/delete/orders/1/products')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('DELETE /orders/delete/:id (<< delete order with id >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .delete('/orders/delete/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
    });
    // test DashBoard endpoints with supertest
    describe('DashBoard endpoints', (): void => {
      it('GET /orders/userorder/:user_id (<< get orders made by specific user >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/orders/userorder/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /orders/completedorders/:id (<< get compeleted orders only made by specific user >>)', async (): Promise<void> => {
        const response: supertest.Response = await request
          .get('/orders/completedorders/1')
          .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
      });
      it('GET /top5popular (<< get top 5 popular products which have the biggest sum of quantity >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/top5popular');
        expect(response.status).toBe(200);
      });
      it('GET /top5selling (<< get top 5 selling products which have the biggest sum of quantity multiplied with product pricey >>)', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/top5selling');
        expect(response.status).toBe(200);
      });
    });
  });
});
