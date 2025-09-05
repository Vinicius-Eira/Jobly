import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = localStorage.getItem("auth") === "true"

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />
}
