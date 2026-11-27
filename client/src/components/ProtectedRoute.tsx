import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
