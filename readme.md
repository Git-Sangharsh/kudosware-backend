# Web Application with Node.js, Express, and MongoDB

This web application is built using Node.js, Express, MongoDB, and Mongoose. It allows users to sign up, upload a resume, and fetch user data and resumes. The application uses `multer` for handling file uploads and `dotenv` for managing environment variables securely.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Features

- **User Registration**: Register new users with name, email, password, and upload a resume.
- **Resume Upload and Storage**: Upload resumes are stored in MongoDB in binary format.
- **Fetch User Data**: Retrieve a list of all users with their details.
- **Resume Download**: Download resumes by user ID.

## Installation

To run this application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies**:

   ```npm install

3. **Create a .env file in the root directory and add the following environment variables:**:

   ```MONGODB_USERNAME=your_mongodb_username
   ```MONGODB_PASSWORD=your_mongodb_password

4. **Start The Application**:
    ```
git status
git add
git commit
```

## Project Structure
.
├── server.js        # Main server file
├── package.json     # Node.js dependencies and scripts
├── .env             # Environment variables
└── README.md        # Project documentation


## Usage
Once the server is running, you can interact with the application using a tool like Postman or a web browser.

API Endpoints
1. User Registration
Endpoint: /signup
Method: POST
Description: Registers a new user and uploads a resume.
Body:
name (string): User's name
email (string): User's email
password (string): User's password
resume (file): Resume file to upload

2. Get All Users
Endpoint: /users
Method: GET
Description: Fetches all users with their name, email, and ID.

3. Get Resume by User ID
Endpoint: /users/:id/resume
Method: GET
Description: Fetches the resume of a user by their unique ID.
Params:
id (string): User ID
Technologies Used
Node.js: JavaScript runtime environment
Express: Web application framework for Node.js
MongoDB: NoSQL database for storing user data and resumes
Mongoose: ODM for MongoDB and Node.js
Multer: Middleware for handling multipart/form-data (file uploads)
CORS: Middleware to enable cross-origin requests
dotenv: Module for loading environment variables

