import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  return localStorage.getItem("loggedIn")
    ? children
    : <Navigate to="/" />;
}

export default ProtectedRoute;