import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../Pages/Home/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <p>Sign In</p>,
  },
]);

export default router;
