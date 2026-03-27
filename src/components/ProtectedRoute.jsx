import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('ghg_admin_auth') === 'true';
  return isAuth ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
