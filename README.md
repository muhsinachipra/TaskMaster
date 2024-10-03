# Task Management Application

This is a full-stack Task Management Application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. The application allows users to manage their tasks with CRUD operations, real-time updates, and data visualization for task statistics.

## Features

- **Authentication**: User authentication with JWT.
- **Task Management**: Create, read, update, and delete tasks.
- **Real-time Updates**: Real-time task updates using Socket.IO.
- **Task Statistics**: Data visualization of task completion and overdue statistics.
- **Responsive Design**: Fully responsive design.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (version 16.x or higher)
- **MongoDB** (running locally or in the cloud)
- **npm** or **yarn** (package manager)
- **Postman** (for API testing, optional)

---

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies

#### Backend (Server)

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

#### Frontend (Client)

Navigate to the client folder and install dependencies:

```bash
cd client
npm install
```

### 3. Configure Environment Variables

#### Backend (`server/.env`)

Create a `.env` file in the `server` directory and add the following environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret
SOCKET_IO_URL=http://localhost:5000
```

#### Frontend (`client/.env`)

Create a `.env` file in the `client` directory and add the following environment variable:

```bash
VITE_API_URL=http://localhost:5000
```

### 4. Start MongoDB

Ensure MongoDB is running locally. If you're using a cloud-hosted MongoDB (e.g., MongoDB Atlas), replace the `MONGO_URI` in your `.env` file with your connection string.

### 5. Start the Application

#### Backend (Server)

In the `server` directory, start the backend server:

```bash
npm run dev
```

This will start the server on `http://localhost:5000`.

#### Frontend (Client)

In the `client` directory, start the React development server:

```bash
npm run dev
```

This will start the frontend on `http://localhost:5173`.

### 6. Test with Postman

You can use **Postman** or any other API client to test the backend API. Use the following steps to interact with the API:

1. **Authentication**: First, register/login and get a JWT token.
2. **Authorization**: Include the token in the `Authorization` header as `Bearer <your-token>` for all protected routes.

---

## API Endpoints

### Auth

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and get a JWT token.

### Task Management

- **GET** `/api/tasks`: Get all tasks for the logged-in user.
- **POST** `/api/tasks`: Create a new task.
- **PUT** `/api/tasks/:id`: Update a task by ID.
- **DELETE** `/api/tasks/:id`: Delete a task by ID.

### Task Statistics

- **GET** `/api/tasks/stats`: Retrieve task statistics (total, completed, overdue tasks).

---

## WebSockets (Real-time Updates)

The application uses **Socket.IO** to provide real-time updates on task creation, updates, and deletion. The server emits real-time events that the client listens to, ensuring that changes are reflected immediately.

---

## Running Tests

You can run automated unit tests for your backend using:

```bash
npm test
```

---

## Deployment

You can deploy the frontend and backend separately or together. If you use a service like **Heroku**, ensure you set up the appropriate environment variables and configure Socket.IO for deployment.

---

## Tech Stack

- **Frontend**: React, Vite, Axios, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Socket.IO
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Real-time Communication**: Socket.IO

---

## License

This project is licensed under the MIT License.

---

## Author

- [Muhsin Achipra](https://github.com/muhsinachipra)
