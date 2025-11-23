import { createBrowserRouter } from 'react-router';
import AuthLayout from '../Layouts/AuthLayout';
import RootLayout from '../Layouts/RootLayout';
import AboutUs from '../pages/AboutUs/AboutUs';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import Coverage from '../pages/Coverage/Coverage';
import Home from '../pages/Home/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Rider from '../pages/Rider/Rider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },

      {
        path: '*',
        Component: NotFound,
      },
    ],
  },

  // Auth routes can be added here in the future
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
    ],
  },
]);
