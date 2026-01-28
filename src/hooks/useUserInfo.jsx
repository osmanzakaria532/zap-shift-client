/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const UseUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      // console.log(res.data);

      return res.data;
    },
  });
  return (
    <>
      {/* <div>{users.filter((u) => u.email === user?.email)[0]?.role}</div> */}
      <div className="flex gap-2 lowercase">
        <div>{users.filter((u) => u.email === user?.email)[0]?.email}</div>
        <div>{users.filter((u) => u.email === user?.email)[0]?.region}, </div>
        <div>{users.filter((u) => u.email === user?.email)[0]?.district}</div>
      </div>
    </>
  );
};

export default UseUserInfo;
