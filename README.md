# Environment variables
  To satisfy Udacity requirements, the following environment variable are needed.

  ENV=dev

  # DB VARIABLES
  POSTGRES_HOST=localhost
  
  DEV_POSTGRES_DB=full_stack_dev
  
  TEST_POSTGRES_DB=full_stack_test
  
  POSTGRES_USER=full_stack_user
  
  POSTGRES_PASSWORD=password123

  # BCRYPT VARIABLES
  BCRYPT_PASSWORD=speak-friend-and-enter
  SALT_ROUNDS=10

  # JWT
  TOKEN_SECRET=alohomora123!

# Usage
The server will listen on port 3000

# Ports
The application runs on port 3000 with database on 5432.

# Scripts
  Install: npm install
  
  Build: npm run build
  
  Run unit tests: npm test
  
  Start server: yarn watch
  
  reset-dev-db: npm run reset-dev-db
  
  up-dev-db: npm run up-dev-db

# Database Setup
 Create Databases
  We shall create the dev and test database.

  1) connect to the default postgres database as the server's root user using this command: psql -U postgres -h localhost postgres

  2) In psql run the following to create a user:
  CREATE USER store_user WITH PASSWORD 'password123';

  3) In psql run the following to create the dev and test database:
  CREATE DATABASE store;
  
  CREATE DATABASE store_test;

  4) Connect to the databases and grant all privileges:
  - Grant for dev database:
  
  \c store
  
  GRANT ALL PRIVILEGES ON DATABASE store TO store_user;

  - Grant for test database:
  
  \c store_test
  
  GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;

# Migrate Database
Navigate to the root directory and run the command below to migrate the database:

 npm run up-dev-db

 # Endpoint Access
 All endpoints are described in the REQUIREMENT.md file.
