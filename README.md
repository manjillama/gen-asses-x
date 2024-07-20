## 🥙 Project Introduction

User management and authentication system. Some of the key features are as follows:

- User can choose to register or login.
- User can be get new access token using the refresh token if the previous token has expired.
- User can update profile
- User can see list of all registerd users
- Users can choose to delete their account.

## 👾 Tech stacks

- Backend: Express.js
- Language: TypeScript
- Database: MongoDB (using mongoose)
- Authentication: JWT (Access token and refresh token approach)
- Testing framework: Jest
- NodeJS >= 18.x
- Yarn >= 1.x
- MongoDB >= 7.x

## 📜 Docs

### Register new user

```curl
POST /api/auth/register
```

Request body example:

```json
{
  "name": "Manjil Tamang",
  "email": "mail@manjiltamang.com",
  "password": "password123"
}
```

Response example:

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "669be986716b0efa2b34d5d1",
      "email": "mail@manjiltamang.com",
      "name": "Manjil Tamang",
      "lastLoggedInAt": "2024-07-20T16:44:54.249Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWxAbWFuamlsdGFtYW5nLmNvbSIsImlkIjoiNjY5YmU5ODY3MTZiMGVmYTJiMzRkNWQxIiwiaWF0IjoxNzIxNDkzODk0LCJleHAiOjE3MjE0OTQxOTR9.PBoUjNoBqKQnFSSitzDzqi-x2VDy1-xCizhl-zUaDro",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJlOTg2NzE2YjBlZmEyYjM0ZDVkMSIsImlhdCI6MTcyMTQ5Mzg5NH0.To6Iezd1qO9mW7hRLuLmSilOBZeiotaw5IiKltXkTEM"
  }
}
```

### Login

```curl
POST /api/auth/login
```

Request body example:

```json
{
  "email": "mail@manjiltamang.com",
  "password": "password123"
}
```

Response example:

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "669be986716b0efa2b34d5d1",
      "email": "mail@manjiltamang.com",
      "name": "Manjil Tamang",
      "lastLoggedInAt": "2024-07-20T16:44:54.249Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWxAbWFuamlsdGFtYW5nLmNvbSIsImlkIjoiNjY5YmU5ODY3MTZiMGVmYTJiMzRkNWQxIiwiaWF0IjoxNzIxNDkzODk0LCJleHAiOjE3MjE0OTQxOTR9.PBoUjNoBqKQnFSSitzDzqi-x2VDy1-xCizhl-zUaDro",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJlOTg2NzE2YjBlZmEyYjM0ZDVkMSIsImlhdCI6MTcyMTQ5Mzg5NH0.To6Iezd1qO9mW7hRLuLmSilOBZeiotaw5IiKltXkTEM"
  }
}
```

### Refresh access token using refresh token

```curl
POST /api/auth/refresh
```

Request body example:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJlOTg2NzE2YjBlZmEyYjM0ZDVkMSIsImlhdCI6MTcyMTQ5MzkwNH0.UIbuq7Ce2M3cuFLN20a4JBfpi94yyphvrB2490Sw9bs"
}
```

Response example:

```json
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWxAbWFuamlsdGFtYW5nLmNvbSIsImlkIjoiNjY5YmU5ODY3MTZiMGVmYTJiMzRkNWQxIiwiaWF0IjoxNzIxNDkzOTM1LCJleHAiOjE3MjE0OTQyMzV9.lSLuNZfaIZQTWH4Byw58ylhcZjS3l6MhPpnBHN8hvho",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJlOTg2NzE2YjBlZmEyYjM0ZDVkMSIsImlhdCI6MTcyMTQ5MzkwNH0.UIbuq7Ce2M3cuFLN20a4JBfpi94yyphvrB2490Sw9bs"
  }
}
```

### Get all registered users

```curl
GET /api/users
```

Authentication:

| Auth Type    | Value       |
| ------------ | ----------- |
| Bearer token | Token value |

Response example:

```json
{
  "status": "success",
  "data": {
    "total": 1,
    "size": 40,
    "users": [
      {
        "_id": "669be986716b0efa2b34d5d1",
        "name": "Manjil Tamang",
        "email": "mail@manjiltamang.com",
        "lastLoggedInAt": "2024-07-20T16:45:04.909Z"
      }
    ]
  }
}
```

### Get user profile

```curl
POST /api/users/me
```

Authentication:

| Auth Type    | Value       |
| ------------ | ----------- |
| Bearer token | Token value |

Response example:

```json
{
  "status": "success",
  "data": {
    "_id": "669be986716b0efa2b34d5d1",
    "email": "mail@manjiltamang.com",
    "name": "Manjil Tamang",
    "lastLoggedInAt": "2024-07-20T16:45:04.909Z"
  }
}
```

### Update profile

```curl
PUT /api/users/me
```

Authentication:

| Auth Type    | Value       |
| ------------ | ----------- |
| Bearer token | Token value |

Request body example:

```json
{
  "name": "Jodn D."
}
```

Response example:

```json
{
  "status": "success",
  "data": {
    "_id": "669be986716b0efa2b34d5d1",
    "email": "mail@manjiltamang.com",
    "name": "Jodn D.",
    "lastLoggedInAt": "2024-07-20T16:45:04.909Z"
  }
}
```

### Delete profile

```curl
DEL /api/users/me
```

Authentication:

| Auth Type    | Value       |
| ------------ | ----------- |
| Bearer token | Token value |

Response example:

```json
{
  "status": "success"
}
```

## Architectural Analysis

My thoughts on scaling this solution -

- First and foremost - Identifying potential bottlenecks
  - Database scalability (sharding, optimizing indexing)
  - Microservice architecture with load balancing
- Scaling strategies
  - Vertical scaling
  - Horizontal scaling
  - Database scaling (shards, optimizing indexes, replicas)
  - Caching for reducing database load and response time
- Handling increased traffic
  - Implement rate limiting to prevent abuse and protect service from DDoS attacks
  - Asynchronous processing (Offloading non-critical tasks to message queue)
- High availability
  - Use load balancing do distribute traffics across multiple instances
  - Fault detection and recovery (Health checks, failover strategies)
- Other
  - Regularly forecast capacity and needs based on user growth projections and anticipate traffic patterns.
  - Security considerations
- Improvements
  - Logging and monitoring to identify performance bottlenecks and operational issues.

## 🗂️ Folder structure

```
|-- tests             # All unit and integration test files goes here
|-- src
    |   index.js      # App entry point
    |   app.js        # Load express application modules
    |-- config        # Environment variables and configuration related stuff
    |-- controllers   # Express route controllers
    |-- interfaces    # TypeScript interfaces
    |-- middlewares   # Express middlewares
    |-- models        # Mongoose models
    |-- routes        # Express routes
    |-- services      # Service modules
    |-- startup       # Split the startup process into modules
    |-- types         # Shared TypeScript types
    |-- utils         # Shared utilities modules
```

## ⚙️ Setup

First of all, you need to check if you're using the required versions of Node.js and npm <br/>

Then, please follow the instructions below:

### Clone the repo:

```bash
$ git clone https://github.com/manjillama/gen-asses-x.git

$ cd gen-asses-x
```

Install dependencies:

```bash
$ yarn
```

Set environment variables:

```bash
$ cp .env.example .env
```

### Running Locally

```bash
$ yarn dev
```

## Available Scripts

In the project directory, you can run:

### Lint

```bash
# lint code with ESLint
$ yarn lint

# try to fix ESLint errors
$ yarn lint:fix
```

### Test

```bash
# run all tests with Mocha
$ yarn test
```

### Validate

```bash
# run lint and tests
$ yarn validate
```
