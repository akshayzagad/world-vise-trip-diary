import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();

  if (!isAuthenticate) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
}

export default ProtectedRoute;
