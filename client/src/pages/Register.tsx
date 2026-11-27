import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import type { RegisterFormValues } from "../types/user";
import api from "../api/axios";
import { login } from "../store/user/userSlice";
import { toast } from "react-toastify";

const registerSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password need at least 6 cheracters")
    .required("password is required"),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const responce = await api.post("/register", values);
        // console.log(responce);
        dispatch(login(responce.data.userData));
        toast.success(responce.data.message);
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed.");
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log("register error in register page");
      }
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign up to get started with TaskManager
          </p>
        </div>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="mt-1 text-xs text-red-600">
              {formik.errors.fullName}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {formik.errors.password}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
