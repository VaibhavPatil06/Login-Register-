# MERN Stack Project

## Overview
This project is a MERN stack application that includes a user registration and login system with password validation and security measures. The frontend is built with React, and the backend is powered by Node.js, Express, and a MySQL database.

## Table of Contents
- [Frontend](#frontend)
- [Backend](#backend)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## Frontend

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    https://github.com/VaibhavPatil06/Login-Register-
    ```

2. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Frontend
To start the frontend development server, run:
```sh
npm start
```

Backend :-

Prerequisites :
    Node.js
    npm (Node Package Manager)
    MySQL
    
Installation :
Navigate to the backend directory:
    Copy code
    cd backend

    
Install the dependencies:
    npm install
    
Create a .env file in the backend directory and add your MySQL database credentials:
.env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=user_management
    

Running the Backend
To start the backend server, run:
npm run start
The backend will be running at http://localhost:5000.



Database Setup
MySQL
Create the users table:
CREATE DATABASE IF NOT EXISTS user_management;
USE user_info;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
