/**
 * Custom hook to fetch the current user's role from the server.
 * Uses React Query to handle data fetching, caching, and loading state.
 *
 * The hook gets the logged-in user from the authentication context
 * and sends a secure request to the backend using a protected Axios instance.
 *
 * If no role is found, it defaults to "user".
 *
 * Returns:
 * - role: the user's role (e.g. admin, user)
 * - roleLoading: indicates whether the role is still being loaded
 */

import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = 'user', isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data?.role || 'user'; // Default to 'user' if no role found
    },
  });
  return { role, roleLoading };
};

export default useRole;
