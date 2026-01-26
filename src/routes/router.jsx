import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import RootLayout from '../layouts/RootLayout';
import AboutUs from '../Pages/AboutUs/AboutUs';
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword';
import LogIn from '../Pages/Auth/LogIn/LogIn';
import Register from '../Pages/Auth/Register/Register';
import CompleteProfile from '../Pages/Auth/SocialLogin/CompleteProfile';
import Coverage from '../Pages/Coverage/Coverage';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import ApproveRiders from '../Pages/Dashboard/ApproveRiders/ApproveRiders';
import DashBoard from '../Pages/Dashboard/DashBoard';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentCancel from '../Pages/Dashboard/Payment/PaymentCancel/PaymentCancel';
import PaymentHistory from '../Pages/Dashboard/Payment/PaymentHistory/PaymentHistory';
import PaymentSuccess from '../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess';
import Home from '../Pages/Home/Home/Home';
import NotFound from '../Pages/NotFound/NotFound';
import Rider from '../Pages/Rider/Rider';
import SendParcel from '../Pages/SendParcel/SendParcel';
import Settings from '../Pages/Settings/settings';
import PrivateRouter from './PrivateRouter';

const router = createBrowserRouter([
  // RootLayout
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
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
      {
        path: 'send-a-parcel',
        element: (
          <PrivateRouter>
            <SendParcel />,
          </PrivateRouter>
        ),
        // Service Centers's Data loade From Public Folder
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
    ],
  },

  // AuthLayout
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'register',
        Component: Register,
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'sign-in',
        Component: LogIn,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
      {
        path: 'complete-profile',
        Component: CompleteProfile,
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
    ],
  },

  // Dashboard Layout
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: '',
        Component: DashBoard,
      },
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancel,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      },
      {
        path: 'approve-riders',
        Component: ApproveRiders,
      },
      {
        path: 'all-users',
        Component: AllUsers,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]);

export default router;
