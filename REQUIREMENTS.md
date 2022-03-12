## API Endpoints

#### Products

- Index use HTTP GET

  - http://localhost:3000/products

- Create [token required] use HTTP POST

  - http://localhost:3000/products/create
  - {
    name: req.body.name as string,
    "price": 20,
    "category": "men"
    } data like this be must sent in the body of reqest

- Show use HTTP GET

  - http://localhost:3000/products/show/id want to show
  - ex: http://localhost:3000/products/show/1

- Products by category (args: product category) use HTTP GET

  - http://localhost:3000/products/get/category want to get
  - ex: http://localhost:3000/products/get/man

- [ADDITIONAL] Delete use HTTP DELET

  - http://localhost:3000/products/delete/id want to delete
  - ex: http://localhost:3000/products/delete/2

- [ADDITIONAL] Update use HTTP PUT
  - http://localhost:3000/products/update/id want to update
  - ex: http://localhost:3000/products/update/3

#### Users

- Index [token required] use HTTP GET

  - ex http://localhost:3000/users

- Show [token required] use HTTP GET

  - http://localhost:3000/users/show/ id want to get
  - ex http://localhost:3000/users/show/1

- Create [token required] use HTTP POST

  - ex http://localhost:3000/users/create
    {"fname": "ali",
    "lname": "ahmed",
    "pass": 147258
    } data like this must be sent in the body of reqest

- [ADDITIONAL] Delete [token required] use HTTP DELETE

  - http://localhost:3000/users/delete/id id want to delete
  - ex: http://localhost:3000/users/delete/2

- [ADDITIONAL] Update [token required] use HTTP PUT
  - ex: http://localhost:3000/users/update/id id want to update
  - ex: http://localhost:3000/users/update/4
  - {"fname": "ali",
    "lname": "ahmed",
    "pass": 147258
    } data like this must be sent in the body of reqest

#### Orders

- [ADDITIONAL] Index use HTTP GET

  - http://localhost:3000/orders

- [ADDITIONAL] Show use HTTP GET

  - http://localhost:3000/orders/show/id want to get
  - http://localhost:3000/orders/show/3

- [ADDITIONAL] Create [token required] use HTTP POST

  - http://localhost:3000/orders/create
    {"status":"active",
    "user_id":1
    } data like this must be sent in the body of reqest

- [ADDITIONAL] Delete [token required] use HTTP DELETE

  - http://localhost:3000/orders/delete/id id want to delete
  - ex: http://localhost:3000/orders/delete/5

- Add Product to order use HTTP POST
  - http://localhost:3000/orders/id/products id of order want prodcy to add to -
  - ex: http://localhost:3000/orders/2/products
  - {"quantity": 5,
    "product_id":2
    } data like this must be sent in the body of reqest

#### DashBoard

- Top 5 most popular products use HTTP GET

  - http://localhost:3000/top5popular

- Current Order by user (args: user id)[token required] use HTTP GET

  - http://localhost:3000/orders/userorder/id user id
  - http://localhost:3000/orders/userorder/1 user id

- [ADDITIONAL] Current Completed only Order by user (args: user id)[token required] use HTTP GET

  - http://localhost:3000/orders/completedorders/id user id
  - http://localhost:3000/orders/completedorders/2

- [ADDITIONAL] Top 5 most selling products use HTTP GET
  - http://localhost:3000/top5selling

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY
- name VARCHAR(100) NOT NULL
- price integer NOT NULL
- category VARCHAR(100)

#### User

- id SERIAL PRIMARY KEY
- firstName VARCHAR(100)
- lastName VARCHAR(100)
- password VARCHAR(100)

#### Orders

- id SERIAL PRIMARY KEY
- user_id bigint references users(id)
- status of order (active or complete) VARCHAR(100)

#### order_products

- id SERIAL PRIMARY KEY
- quantity integer "of each product in the order"
- order_id bigint REFERENCES orders(id) "id of each order in order table"
- product_id bigint REFERENCES products(id) "id of each product in the product table"
