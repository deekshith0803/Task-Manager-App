# Task Manager (MERN + TypeScript)

A full-stack Task Management web application built with MongoDB, Express, React, Node.js, and TypeScript. Users can register, log in with `httpOnly` JWT cookie authentication, persist sessions across page reloads, and organize tasks across a 3-column Kanban board (**Pending**, **Ongoing**, and **Completed**).

---

## Features

- **Authentication & Session Persistence:** Register, login, logout, and automatic session restoration (`GET /api/me`) using JWT stored in `httpOnly` cookies.
- **Protected Routes & API Middleware:** Server-side JWT verification middleware and client-side `ProtectedRoute` guard.
- **3-Column Task Board:** Real-time filtering into **Pending**, **Ongoing**, and **Completed** columns with live task counters.
- **Full Task CRUD:** Create tasks, edit task details (`title`, `description`, `status`), switch task statuses with one click, and delete tasks.
- **Form Validation & Notifications:** Client-side validation powered by Formik and Yup with toast feedback via React-Toastify.

---

## Tech Stack

### Frontend (`client/`)

- **Framework:** React, TypeScript, Vite
- **State Management:** Redux Toolkit (`authSlice`, `taskSlice`)
- **Routing & HTTP:** React Router DOM, Axios (`withCredentials: true`)
- **Styling & UI:** Tailwind CSS v4, React-Toastify
- **Forms & Validation:** Formik, Yup

### Backend (`server/`)

- **Runtime & Framework:** Node.js, Express, TypeScript
- **Database & ODM:** MongoDB, Mongoose
- **Auth & Security:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, `cors`

---

## Project Structure

```text
task-manager/
├── client/                 # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── api/            # Axios instance configured with credentials
│   │   ├── components/     # Navbar, ProtectedRoute, TaskCard, TaskForm
│   │   ├── pages/          # Dashboard, Login, Register
│   │   ├── store/          # Redux store and slices (auth, task)
│   │   └── types/          # TypeScript interfaces and props
│   └── package.json
├── server/                 # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── config/         # MongoDB connection setup
│   │   ├── controllers/    # Auth and Task route handlers
│   │   ├── middleware/     # JWT cookie verification middleware
│   │   ├── models/         # Mongoose User and Task schemas
│   │   └── routes/         # Express API routers
│   └── package.json
├── .gitignore
└── README.md
```
