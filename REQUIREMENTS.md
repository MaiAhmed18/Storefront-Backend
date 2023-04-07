# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index --> http://localhost:3000/products
- Show  --> http://localhost:3000/products/id
- Create [token required]
   endpoint url --> http://localhost:3000/products
   header --> Authorization: token
   body --> {"name": "product1",
      "price": 1000,
      "category": "category1"}
- [OPTIONAL] Top 5 most popular products --> http://localhost:3000/five-most-expensive
- [OPTIONAL] Products by category (args: product category) --> http://localhost:3000/products/category/:category

#### Users
- Index [token required]
   endpoint url --> http://localhost:3000/users
   header --> Authorization: token

- Show [token required]
   endpoint url --> http://localhost:3000/users/id
   header --> Authorization: token
- Create N[token required]
   endpoint url --> http://localhost:3000/users
   header --> Authorization: token
   body --> {"username": "test.user",
      "firstname": "test",
      "lastname": "user",
      "password_digest": "password"}

#### Orders
- Current Order by user (args: user id)[token required]
   endpoint url --> http://localhost:3000/orders/current/:user_id
   header --> Authorization: token
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
   endpoint url --> http://localhost:3000/orders/completed/:user_id
   header --> Authorization: token

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

Schema: CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(64)
);

#### User
- id
- firstName
- lastName
- password

Schema: CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_digest VARCHAR
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Schema:

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(60),
    user_id BIGINT REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);
