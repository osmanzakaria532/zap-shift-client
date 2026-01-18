import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // console.log(`PrivateRouter`, { user, loading, location });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={location.pathname} />;
  }

  return children; // <-- main fix
};

export default PrivateRouter;
