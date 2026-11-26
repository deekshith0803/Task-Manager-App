# Task Manager App

A full-stack Task Manager application built with **TypeScript, Node.js, Express, MongoDB (Mongoose), and React**. Users can register, authenticate with JWT cookies, and manage private tasks with create, read, update, status update, and delete operations.

## Features

- **User Authentication:** Register, log in, and log out using `bcrypt` password hashing and JWT token verification.
- **Private Task Management:** Tasks are linked to the authenticated user (`user` ObjectId reference) so users only access their own tasks.
- **Full CRUD & Status Updates:**
  - Create a task (`title`, `description`, default `status: "pending"`)
  - Fetch all tasks for the logged-in user
  - Update task details (`title`, `description`, `status`)
  - Update task status (`pending`, `ongoing`, `completed`)
  - Delete a task
- **Filter Tasks (Frontend):** Filter tasks by **All**, **Pending**, **Ongoing**, or **Completed**.

## Tech Stack

- **Frontend:** React, TypeScript, Axios, React Router
- **Backend:** Node.js, Express, TypeScript, Mongoose, `bcrypt`, `jsonwebtoken`, `cookie-parser`, `cors`, `dotenv`
- **Database:** MongoDB

## Backend API Endpoints

### Auth Routes (`/api`)

- `POST /api/register` — Register a new user (`fullName`, `email`, `password`)
- `POST /api/login` — Authenticate user and set the `token` cookie (`email`, `password`)
- `POST /api/logout` — Clear the `token` cookie

### Task Routes (`/api` — Protected by `verifyToken`)

- `POST /api/create` — Create a new task (`title`, `description`)
- `GET /api/all` — Get all tasks for the authenticated user
- `PUT /api/update/:id` — Update a task (`title`, `description`, `status`)
- `PATCH /api/update/:id/status` — Update only task `status` (`pending` | `ongoing` | `completed`)
- `DELETE /api/delete/:id` — Delete a task by ID

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```
