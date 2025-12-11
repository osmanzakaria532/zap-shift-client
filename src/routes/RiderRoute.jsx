import Forbidden from '../components/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity"></span>
    </div>;
  }

  if (role !== 'rider') {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
