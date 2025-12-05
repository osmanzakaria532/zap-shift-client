import Forbidden from '../components/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity"></span>
    </div>;
  }

  if (role !== 'admin') {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
