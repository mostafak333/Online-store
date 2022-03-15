# Storefront Backend Project

online storefront is a great product idea that make Users able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## Getting Started

For development, you will only need Node.js and a node global package, installed in your environement.

## Node

- #### Node installation on Windows
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  You can install nodejs and npm easily with apt install, just run the following commands.
  $ install nodejs
  $ install npm
- ### node global package used in project as dependencies
  - express ,@types/express, bcrypt,body-parser ,db-migrate ,db-migrate-pg ,dotenv ,jsonwebtoken ,pg ,typescript
- ### node global package used in project as devdependencies
  - @types/bcrypt ,@types/jasmine ,@types/jsonwebtoken ,@types/pg ,jasmine ,jasmine-spec-reporter ,jasmine-ts ,nodemon ,prettier ,ts-node ,tsc-watch

## Lets start

- run -> npm install and dependencies and devdependencies will install

## scripts used

- prettier: npm run prettier
- Build: npm run build
- Run unit tests: npm run test
- Start server: npm run start

# DataBase

## Database running on Default port 5432.
## to connect to db create db called online_store and run migrations up files
#### create database using SQL query 
- CREATE DATABASE  online_store;  this for dev 
- CREATE DATABASE test_online_store; this for testing

## shape of tables

#### Users table

    -id
    -firstName
    -lastName
    -password

#### products table

    -id
    -name
    -price
    -category

#### Orders table

    -id
    -status
    -user_id REFERENCES users(id)

#### Order_products table becase products and orders have many to many relation

    -id
    -quantity
    -order_id  REFERENCES orders(id),
    -product_id REFERENCES products(id)

# server running on localhost on port 3000.

# Environment variables

- POSTGRES_HOST=localhost
- POSTGRES_DB=online_store
- POSTGRES_TEST_DB=test_online_store
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=pass123
- ENV=dev
- BCRYPT_PASSWORD=p@ssW0rd-3nkora
- SALT_ROUNDS=10
- TOKEN_SECRET=tokensecret123
