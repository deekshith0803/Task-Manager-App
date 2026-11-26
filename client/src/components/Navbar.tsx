import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import api from "../api/axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const responce = await api.post("/logout");
      console.log(responce);
      dispatch(logout());
      toast.success(responce.data.message);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("logout error");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-sm">
            TM
          </div>

          <span className="hidden text-lg font-semibold tracking-tight text-slate-800 sm:block">
            TaskManager
          </span>
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/tasks"
              className="text-sm font-medium capitalize text-slate-600 transition-colors hover:text-indigo-600"
            >
              My Tasks
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="text-sm font-medium capitalize text-slate-600 transition-colors hover:text-indigo-600"
            >
              Profile
            </Link>
          </li>
        </ul>

        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium capitalize text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95"
            >
              logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
