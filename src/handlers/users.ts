import express from 'express';
import { User, UserClass } from '../models/user';
import jwt from 'jsonwebtoken';
const userClass = new UserClass();
// show all users [token required]
const index = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const result = await userClass.index();
  res.json(result);
};
// show specific user with id  [token required]
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
  const result = await userClass.show(req.params.id);
  res.json(result);
};
// create new user [token required]
const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    firstName: req.body.fname as string,
    lastName: req.body.lname as string,
    password: req.body.pass as string
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
    const result = await userClass.create(user);
    var token = jwt.sign({ User: result }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error + '' + user);
  }
};
//delete specific user with id  [token required]
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
    const result = await userClass.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//update specific user with id  [token required]
const update = async (req: express.Request, res: express.Response) => {
  const user: User = {
    firstName: req.body.fname as string,
    lastName: req.body.lname as string,
    password: req.body.pass as string
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
    const result = await userClass.update(user, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error + '' + user);
  }
};

// user routes
const userRoutes = (app: express.Application) => {
  app.get('/users', index); //ex: http://localhost:3000/users
  app.get('/users/show/:id', show); //ex: http://localhost:3000/users/show/1
  app.post('/users/create', create); //ex: http://localhost:3000/users/create and send {"fname": "ali","lname": "ahmed","pass": 147258} in body of req
  app.delete('/users/delete/:id', destroy); //ex: http://localhost:3000/users/delete/1
  app.put('/users/update/:id', update); //ex: http://localhost:3000/users/update/1 and send {"fname": "ali","lname": "ahmed","pass": 147258} in body of req
};

export default userRoutes;
