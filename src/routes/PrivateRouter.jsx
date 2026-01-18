import { Navigate } from 'react-router';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return { children };
};

export default PrivateRouter;
