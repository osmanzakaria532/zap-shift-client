import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import './index.css';
import router from './routes/router.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode></StrictMode>,
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>,
);
