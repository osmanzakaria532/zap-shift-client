import { Outlet } from 'react-router';
import Container from '../components/Container';
import useAuth from '../hooks/useAuth';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const RootLayout = () => {
  const { user } = useAuth();

  // console.log({ user });

  return (
    <div className="">
      <Navbar />
      <Container className="py-5">{user?.email}</Container>
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
