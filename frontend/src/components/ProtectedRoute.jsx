import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const ProtectedRoute = () => {
  const { currentUser } = useAppContext();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
