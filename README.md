![Agreena](https://agreena.com/wp-content/uploads/2021/06/agreena-logo.svg)

# NodeJS recruitment test task

### Carbon Certificates application API
Create the API containing endpoints:
1. Login
2. List of available Carbon certificates (*no owner*)
3. List of owned Carbon certificates (*owned by current user*)
4. Transfer my own Carbon certificate to the another existing user (*based on the User ID parameter*)

##### Data informations
**Carbon certificate** should contain the following data:
- Unique ID
- Country
- Status:
    - `available` (*no owner*)
    - `owned` (*owner is present and certificate hasn't been transferred*)
    - `transferred` (*owner is present and certificate has been transferred from one owner to another*)
- Owner (*relation to existing user, can be empty*)

##### Requirements
- Application should be written with strong typing (*TypeScript*)
- Framework is free of choice
- Authentication should be implemented (*type/package if free of choice*)
- Seeds should be included (*100 random certificates, 5 random users with certificates and 5 without them*)
- Tests have to be included

### Good luck!

## Description
This is a test project for Agreena. It uses NodeJS v16.14.2 and PostgreSQL v14.2

In node NestJS framework is used to create an API. To connct API and database TypeOrm is used.

## Installation
This project is using yarn@3.2.0

```bash
$ yarn install
```

## Running the app
Before running commands below, copy `.env.example` to `.env.local` and set the values.

Once app is running endpoints will be available at `http://localhost:<PORT>/<endpoint>`

```bash
# start database
$ docker compose --env-file .env.local up -d

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# stop database
$ docker compose --env-file .env.local down
```

### Endpoints
All endpoints have OpenAPI documentation available on `/docs` route.

1. Login: `auth/login` POST
2. Sign up: `auth/signup` POST
3. Me: `user/me` GET
4. List carbon certificates: `carbon-certificate` GET
5. Transfer carbon certificate: `carbon-certificate/transfer/<id>` PATCH

## Test
Before running commands below, copy `.env.example` to `.env.test` and set the values.

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
