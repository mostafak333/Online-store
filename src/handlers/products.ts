import { Request, Response, Application, application } from 'express';
import { Product, ProductClass } from '../models/product';
import jwt from 'jsonwebtoken';
import { DashboardQuerisClass } from '../services/dashboard';
const dashboardClass = new DashboardQuerisClass();
const productClass = new ProductClass();
//show all products
const index = async (_req: Request, res: Response) => {
  try {
    const result = await productClass.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//show specific product with id
const show = async (req: Request, res: Response) => {
  try {
    const result = await productClass.show(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//create new product [token required]
const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name as string,
    price: req.body.price as string,
    category: req.body.category as string
  };
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
    const result = await productClass.create(product);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//delete specific product with id  [token required]
const destroy = async (req: Request, res: Response) => {
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
    const result = await productClass.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//update specific product with id  [token required]
const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name as string,
    price: req.body.price as string,
    category: req.body.category as string
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
    const result = await productClass.update(product, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error + '' + product.name);
  }
};
const productsbyCategory = async (req: Request, res: Response) => {
  try {
    const result = await dashboardClass.getProdctsByCategory(
      req.params.category
    );
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// product routes
const productRoutes = (app: Application) => {
  app.get('/products', index); //ex: http://localhost:3000/products
  app.post('/products/create', create); //ex: http://localhost:3000/products/create  and {name: req.body.name as string,"price": 20,"category": "men"} in the body of req
  app.get('/products/show/:id', show); //ex: http://localhost:3000/products/show/1
  app.delete('/products/delete/:id', destroy); //ex: http://localhost:3000/products/delete/1
  app.put('/products/update/:id', update); //ex: http://localhost:3000/products/update/1
  app.get('/products/get/:category', productsbyCategory); //ex: http://localhost:3000/products/get/man
};
export default productRoutes;
