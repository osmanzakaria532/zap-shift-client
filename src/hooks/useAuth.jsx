// Custom hook: AuthContext থেকে auth-related data (user, loading, methods) সহজে পাওয়ার জন্য
import { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';

const useAuth = () => {
  const authInfo = use(AuthContext); // Context থেকে auth info নেয়
  return authInfo; // যেখানেই দরকার, সেখানে return করে
};

export default useAuth;
