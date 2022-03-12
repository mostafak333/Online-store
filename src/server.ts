import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orders_Routes from './handlers/orders';
import dashboard_Routes from './handlers/dashboard';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

// products route from handlers
productRoutes(app);
userRoutes(app);
orders_Routes(app);
dashboard_Routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
