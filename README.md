A simple Task Management API built with Node.js, Express, and MongoDB. This API supports CRUD operations for managing tasks, with features like validation, filtering, pagination, and more.

Features
CRUD Operations: Create, Read, Update, and Delete tasks.
Validation: Schema validation using Joi.
Filtering and Pagination: Query tasks by status, priority, and paginate results.
Sorting: Sort tasks by createdAt or dueDate.
Environment Configuration: Easy configuration using dotenv.


Setup Instructions
Prerequisites

Make sure you have the following installed:
Node.js (v14 or later)
npm (Node Package Manager)
MongoDB (local or cloud instance, e.g., MongoDB Atlas)

Installation

Clone the repository:
git clone https://github.com/your-username/task-management-api.git
cd task-management-api


Install dependencies:
npm install


Set up environment variables:
Create a .env file in the root directory.
Add the following variables:
PORT=5000
SECRET_KEY=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/taskdb

Replace the MONGO_URI value with your MongoDB connection string if you're using a cloud database like MongoDB Atlas.


Running the Application
Start the server:
npm start

The server will start at http://localhost:5000 (or the specified port in the .env file).

Access the API: Use tools like Postman or cURL to interact with the API.
Example:
    Post Task:
    http://localhost:5000/tasks

    Get All Tasks:
    http://localhost:5000/tasks

    Get Specific Task:
    http://localhost:5000/tasks/:id

    Uodate Specific Task:
    http://localhost:5000/tasks/:id

    delete Specific Task:
    http://localhost:5000/tasks/:id    

Development
To start the server in development mode with hot-reloading (requires nodemon):

API Endpoints
Tasks
Method	 Endpoint	  Description
POST	 /tasks	      Create a new task.
GET	     /tasks	      Retrieve all tasks.
GET	     /tasks/:id	  Retrieve a specific task by ID.
PUT	     /tasks/:id	  Update a task by ID.
DELETE	 /tasks/:id	  Delete a task by ID.

User Authentication API
A Node.js API for user authentication, including registration, login, and JWT-based access control.

Features
User Registration: Register users with validation for username, email, and password.
User Login: Authenticate users with email and password.
JWT Authentication: Protect routes using JSON Web Tokens.
Validation: Input validation using Joi.
Password Hashing: Secure user passwords using argon2.

API Endpoints

User Registration
Endpoint: /userregister
Method: POST
Description: Registers a new user.

Request Body:
json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}

Response:
201 Created: { "message": "User registered successfully" }
400 Bad Request: { "error": "Validation or other error message" }

User Login
Endpoint: /userlogin
Method: POST
Description: Logs in an existing user and generates a JWT token.
Request Body:

json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}

Response:
200 OK: { "jwtToken": "your_generated_token" }
401 Unauthorized: { "message": "User not found" } or { "message": "Password not match" }
400 Bad Request: { "error": "Validation or other error message" }

Protected Routes Example
Description: Use the authMiddleware to protect routes.
Steps:
Include the Authorization header in requests:
makefile
Authorization: Bearer <your_jwt_token>
Routes protected with authMiddleware will:
Allow access if the token is valid.
Deny access with a 401 Unauthorized error if the token is invalid or missing.



Here's the directory structure for the project:

webspider-assignment/
├── config/                   # Configuration files
│   └── db.js                 # Database connection logic
├── controllers/              # Controller files for handling business logic
│   ├── taskController.js     # Task-related business logic
│   └── userController.js     # User-related business logic
├── middleware/               # Middleware functions
│   └── auth.js               # Authentication middleware
├── models/                   # Mongoose schemas
│   ├── taskModel.js          # Task model schema
│   └── userModel.js          # User model schema
├── routes/                   # API route definitions
│   ├── taskRoutes.js         # Routes for tasks
│   └── userRoutes.js         # Routes for users
├── .env                      # Environment variables
├── index.js                  # Main server file
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
