import Forbidden from '../Components/Forbidden';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRouter = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== 'admin') {
    return <Forbidden />;
  }
  //   return {children: <>{user && role === 'admin' && <Outlet />}</>,};
  return children;
};

export default AdminRouter;
