import express from 'express';
import { Order, OrderClass } from '../models/order';
import jwt from 'jsonwebtoken';
const orderClass = new OrderClass();
//get all orders
const index = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const order = await orderClass.index();
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// get a specific order with id
const show = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const order = await orderClass.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// create new order
const create = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    status: req.body.status as string,
    user_id: req.body.user_id as string
  };
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const newOrder = await orderClass.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// add product to order
const addProductToOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const quantity = req.body.quantity;
  const order_id = req.params.id as string;
  const product_id = req.body.product_id as string;
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const result = await orderClass.addProduct(quantity, order_id, product_id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// delete product from order with id = number
const deleteProductFromOrder = async (req: express.Request, res: express.Response) => {
  try {
    const authenticationHeader = req.headers.authorization;
    const token = authenticationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const order = await orderClass.deletePoduct(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//delete a specific order with id
const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const authenticationHeader = req.headers.authorization;
    const token = authenticationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const order = await orderClass.delete(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const orders_Routes = (app: express.Application) => {
  app.get('/orders', index); //ex: http://localhost:3000/orders
  app.get('/orders/show/:id', show); //ex: http://localhost:3000/orders/show/1
  app.post('/orders/create', create); //ex: http://localhost:3000/orders/create and send {"status":"active","user_id":1 } in body of req
  app.delete('/orders/delete/:id', destroy); //ex: http://localhost:3000/orders/delete/1
  app.post('/orders/:id/products', addProductToOrder); //ex: http://localhost:3000/orders/1/products and send {"quantity": 5, "product_id":2} in body of req
  app.delete('/delete/orders/:id/products', deleteProductFromOrder); //ex: http://localhost:3000/delete/orders/:id/products 
};
export default orders_Routes;
