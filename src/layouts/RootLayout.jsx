import { Outlet } from 'react-router-dom';
import Container from '../Components/Container';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import UseUserInfo from '../hooks/useUserInfo';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container className="hidden lg:block fixed top-37 left-66 z-50 py-1 px-2 bg-white rounded-lg [writing-mode:vertical-rl] rotate-180">
        <div className="">
          <UseUserInfo />
        </div>
      </Container>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
