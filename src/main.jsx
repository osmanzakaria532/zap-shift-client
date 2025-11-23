import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router/dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import { router } from './routes/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
);
