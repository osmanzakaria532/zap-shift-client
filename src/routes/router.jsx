import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import AboutUs from '../Pages/AboutUs/AboutUs';
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword';
import LogIn from '../Pages/Auth/LogIn/LogIn';
import Register from '../Pages/Auth/Register/Register';
import Coverage from '../Pages/Coverage/Coverage';
import Home from '../Pages/Home/Home/Home';
import NotFound from '../Pages/NotFound/NotFound';
import Rider from '../Pages/Rider/Rider';
import PrivateRouter from './PrivateRouter';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    // Shows a temporary UI while a route’s data loads during hydration.
    hydrateFallbackElement: (
      <div className="min-h-screen flex items-center justify-center">Loading app...</div>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage-area',
        Component: Coverage,
        // Service Centers's Data loade From Public Folder
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'be-a-rider',
        element: (
          <PrivateRouter>
            <Rider />
          </PrivateRouter>
        ),
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'sign-in',
        Component: LogIn,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
