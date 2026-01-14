import { createBrowserRouter } from 'react-router';
import AuthLayout from '../Layouts/AuthLayout';
import DashboardLayout from '../Layouts/DashboardLayout';
import RootLayout from '../Layouts/RootLayout';
import AboutUs from '../pages/AboutUs/AboutUs';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import Coverage from '../pages/Coverage/Coverage';
import AassignedDelivereis from '../pages/Dashboard/AassignedDelivereis/AassignedDelivereis';
import AllParcels from '../pages/Dashboard/AllParcels/AllParcels';
import AllRiders from '../pages/Dashboard/AllRiders/AllRiders';
import ApproveRiders from '../pages/Dashboard/ApproveRiders/ApproveRiders';
import AssignRiders from '../pages/Dashboard/AssignRiders/AssignRiders';
import Dashboard from '../pages/Dashboard/Dashboard';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/Payment/PaymentHistory/PaymentHistory';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess';
import Settings from '../pages/Dashboard/Settings/Settings';
import Users from '../pages/Dashboard/Users/Users';
import Home from '../pages/Home/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Rider from '../pages/Rider/Rider';
import SendParcel from '../pages/SendParcel/SendParcel';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import RiderRoute from './RiderRoute';

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
        path: 'services',
        element: <div>Services Page Coming Soon</div>,
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
        path: 'pricing',
        element: <div>Pricing Page Coming Soon</div>,
      },
      {
        path: 'send-parcel',
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
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
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
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
  // {
  //   path: 'dashboard',
  // },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'all-parcels',
        Component: AllParcels,
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
        path: 'payment-history',
        Component: PaymentHistory,
      },
      {
        path: 'payment-cancelled',
        element: <p>payment-cancelled</p>,
      },

      // Admin Routes
      {
        path: 'approve-riders',
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: 'assign-riders',
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: 'all-riders',
        element: (
          <AdminRoute>
            <AllRiders />
          </AdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
        // Component: Users,
      },

      // Rider Routes
      {
        path: 'assigned-delivereis',
        element: (
          <RiderRoute>
            <AassignedDelivereis />
          </RiderRoute>
        ),
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]);
