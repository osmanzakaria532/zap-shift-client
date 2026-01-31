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
import AllParcels from '../Pages/Dashboard/AllParcels/AllParcels';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import ApproveRiders from '../Pages/Dashboard/ApproveRiders/ApproveRiders';
import AssignedDeliveries from '../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries';
import AssignRiders from '../Pages/Dashboard/AssignRiders/AssignRiders';
import ComplatedDeliveries from '../Pages/Dashboard/ComplatedDeliveries/ComplatedDeliveries';
import DashBoard from '../Pages/Dashboard/DashBoard';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentCancel from '../Pages/Dashboard/Payment/PaymentCancel/PaymentCancel';
import PaymentHistory from '../Pages/Dashboard/Payment/PaymentHistory/PaymentHistory';
import PaymentSuccess from '../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess';
import Edits from '../Pages/Dashboard/Profile/Edits/Edits';
import Profile from '../Pages/Dashboard/Profile/Profile';
import Home from '../Pages/Home/Home/Home';
import NotFound from '../Pages/NotFound/NotFound';
import ParcelTrack from '../Pages/ParcelTrack/ParcelTrack';
import Rider from '../Pages/Rider/Rider';
import SendParcel from '../Pages/SendParcel/SendParcel';
import Settings from '../Pages/Settings/Settings';
import AdminRouter from './AdminRouter';
import PrivateRouter from './PrivateRouter';
import RiderRoute from './RiderRoute';

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
      {
        path: 'parcel-tracking',
        Component: ParcelTrack,
      },
      {
        path: 'parcel-tracking/:trackingId',
        Component: ParcelTrack,
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
        element: (
          <AdminRouter>
            <ApproveRiders />
          </AdminRouter>
        ),
      },
      {
        path: 'all-users',
        element: (
          <AdminRouter>
            <AllUsers />
          </AdminRouter>
        ),
        // Component: AllUsers,
      },
      {
        path: 'all-riders',
        element: (
          <AdminRouter>
            <div>All Riders - Admin Only</div>,
          </AdminRouter>
        ),
      },
      {
        path: 'all-parcels',
        element: (
          <AdminRouter>
            <AllParcels />
          </AdminRouter>
        ),
      },
      {
        path: 'assign-riders',
        element: (
          <AdminRouter>
            <AssignRiders />
          </AdminRouter>
        ),
      },
      {
        path: 'parcel-deliveried',
        element: (
          <AdminRouter>
            <p>parcel-deliveried</p>
          </AdminRouter>
        ),
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            path: 'edit',
            element: <Edits />,
            // element: <p>Edit</p>
          },
        ],
      },

      // Rider Only Routes
      {
        path: 'assigned-deliveries',
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: 'complated-deliveries',
        element: (
          <RiderRoute>
            <ComplatedDeliveries />
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

export default router;
