# Kit Task Manager

## Description

Kit Task Manager is a project built with NestJS, MongoDB, and TypeScript. It provides a task management system with features for project collaboration and task tracking.

## Features

- Authentication using JWT with Passport
- CRUD operations for tasks and projects
- Integration with MongoDB for data storage
- Swagger API documentation

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Clone Repository


git clone https://github.com/your-username/kit-taskmanager.git
cd kit-taskmanager `

### Install Dependencies

`npm install
# or
yarn install`

### Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

# MongoDB URI
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/<database-name>?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key`

### Start Development Server

`npm run start:dev
# or
yarn start:dev`

### Testing

To run tests, use the following command:

yarn test`

API Documentation
-----------------

API documentation is generated using Swagger. Once the server is running in development mode (`start:dev`), access Swagger UI at:

`http://localhost:5002/api`