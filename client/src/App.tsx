import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layout/UserLayout";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import api from "./api/axios";
import { login, logout } from "./store/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const responce = await api.get("/me");
        dispatch(login(responce.data.userData));
      } catch {
        dispatch(logout());
      }
    };
    checkSession();
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
