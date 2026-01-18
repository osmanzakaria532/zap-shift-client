import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();

  console.log(user, loading);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children; // <-- main fix
};

export default PrivateRouter;
