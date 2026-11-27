# Task Manager — Client

Frontend web application for the MERN Task Manager project, built with React, TypeScript, Vite, Redux Toolkit, Tailwind CSS, Formik, Yup, Axios, and React-Toastify.

---

## Features

- **Authentication & Session Persistence:** Supports user registration, login, and logout with cookie-based authentication (`withCredentials: true`), plus automatic session restoration on page reload via `/me`.
- **Protected Routing:** `ProtectedRoute` waits for session verification before allowing access to private views such as the task dashboard and redirects unauthenticated users to `/login`.
- **3-Column Task Board:** Groups tasks into **Pending**, **Ongoing**, and **Completed** columns with live task counts and empty-column states.
- **Create & Edit Modal (`TaskForm`):** Uses Formik and Yup validation for `title`, `description`, and `status` (`"pending" | "ongoing" | "completed"`), supporting both creating new tasks (`POST /create`) and updating existing tasks (`PUT /update/:id`).
- **Task Card Actions (`TaskCard`):** Lets users switch task status (`PATCH /update/:id/status`), open the edit form, and delete tasks (`DELETE /delete/:id`).

---

## Tech Stack

- **Core:** React, TypeScript, Vite
- **State Management:** Redux Toolkit (`authSlice`, `taskSlice`)
- **Routing:** React Router DOM
- **HTTP & Notifications:** Axios, React-Toastify
- **Forms & Validation:** Formik, Yup
- **Styling:** Tailwind CSS

---

## Folder Structure

```text
client/
├── public/
├── src/
│   ├── api/
│   │   └── axios.ts            # Axios instance configured with base URL and credentials
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar and logout action
│   │   ├── ProtectedRoute.tsx  # Route guard handling auth and loading state
│   │   ├── TaskCard.tsx        # Task item card with status, edit, and delete actions
│   │   └── TaskForm.tsx        # Formik + Yup form for creating and editing tasks
│   ├── pages/
│   │   ├── Dashboard.tsx       # 3-column task board (pending, ongoing, completed)
│   │   ├── Login.tsx           # User login page
│   │   └── Register.tsx        # User registration page
│   ├── store/
│   │   ├── hooks.ts            # Typed Redux hooks (useAppDispatch, useAppSelector)
│   │   ├── store.ts            # Redux store configuration
│   │   └── user/
│   │       ├── authSlice.ts    # Authentication state and reducers
│   │       └── taskSlice.ts    # Task list state and reducers
│   ├── types/
│   │   ├── task.ts             # TaskItem, TaskStatus, and TaskCardProps types
│   │   └── user.ts             # User profile and authentication state types
│   ├── App.tsx                 # Application routes and initial session check
│   ├── index.css               # Tailwind CSS entry file
│   └── main.tsx                # Root entry point wrapped with Redux Provider
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
