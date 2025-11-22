import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Coverage from '../pages/Home/Coverage/Coverage';
import Home from '../pages/Home/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import AboutUs from '../pages/AboutUs/AboutUs';

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
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
