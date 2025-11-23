import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }
  return children;
};
export default PrivateRoute;
