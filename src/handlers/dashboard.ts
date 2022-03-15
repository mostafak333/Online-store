import { DashboardQuerisClass } from '../services/dashboard';
import express from 'express';
import jwt from 'jsonwebtoken';
const dashboardClass = new DashboardQuerisClass();
// get all compeleted orders made with a specific user using user id
const completedOrdersByUser = async (
  req: express.Request,
  res: express.Response
) => {
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
    const order = await dashboardClass.completedOrders(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//get all orders (active or compeleted) made with a specific user using user id
const orderByUser = async (req: express.Request, res: express.Response) => {
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
    const order = await dashboardClass.orderByUser(req.params.user_id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// get top 5 selling products which have the biggest sum of quantity
const most5Popular = async (req: express.Request, res: express.Response) => {
  try {
    const order = await dashboardClass.top5Popular();
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// get top 5 selling products which have the biggest sum of quantity multiplied with product pricey
const most5Selling = async (req: express.Request, res: express.Response) => {
  try {
    const order = await dashboardClass.top5Seling();
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const dashboard_Routes = (app: express.Application) => {
  app.get('/orders/userorder/:user_id', orderByUser); //ex: http://localhost:3000/orders/userorder/1
  app.get('/orders/completedorders/:id', completedOrdersByUser); //ex: http://localhost:3000/orders/completedorders/1
  app.get('/top5popular', most5Popular); //ex: http://localhost:3000/top5popular
  app.get('/top5selling', most5Selling); //ex: http://localhost:3000/top5selling
};
export default dashboard_Routes;
