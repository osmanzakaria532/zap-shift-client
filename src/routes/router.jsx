import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Coverage from '../Pages/Coverage/Coverage';
import Home from '../Pages/Home/Home/Home';
import NotFound from '../Pages/NotFound/NotFound';

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
    ],
  },
  {
    path: '/sign-in',
    element: <p>Sign In</p>,
  },
]);

export default router;
