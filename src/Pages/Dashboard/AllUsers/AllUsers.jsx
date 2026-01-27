import { useQuery } from '@tanstack/react-query';
import { AiFillDelete } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUserEmail } = useAuth();

  // const { data: role = 'user', isLoading } = useQuery({
  //   queryKey: ['user-role', loggedInUserEmail?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users/${loggedInUserEmail?.email}/role`);
  //     return res.data;
  //   },
  // });

  const { data: users = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: 'admin' };
    const email = loggedInUserEmail;

    // ✅ FIX 1: API call এর আগে confirmation নেওয়া হচ্ছে
    Swal.fire({
      title: 'Are you sure?',
      text: `${user.displayName} will be made an admin`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make admin!',
    }).then((result) => {
      // ✅ FIX 2: user confirm করলে তবেই নিচের কোড চলবে
      if (result.isConfirmed) {
        // ✅ FIX 3: confirmation এর ভিতরে API call রাখা হয়েছে
        axiosSecure.patch(`/users-role/${user._id}`, { roleInfo, email }).then((res) => {
          // ✅ FIX 4: database update সফল হলে success alert দেখানো হচ্ছে
          if (res.data.modifiedCount) {
            Swal.fire({
              title: 'Admin made successfully!',
              icon: 'success',
            });

            // ✅ FIX 5: role change এর পরে data আবার fetch করা হচ্ছে
            refetch();
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: 'user' };
    const email = loggedInUserEmail; // যেই user currently login আছে
    axiosSecure.patch(`/users-role/${user._id}`, { roleInfo, email }).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: 'Are you sure?',
          text: `Removed ${user.displayName}  From Admin successfully`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Remove from admin!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Removed from Admin successfully!',
              text: '',
              icon: 'success',
            });
          }
        });
        refetch();
      }
    });
  };

  const handleDeleteation = (user) => {
    // delete logic here
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `User deleted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      {/* <h2>Riders Pending Approval: {riders.length}</h2> */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>User Name</th>
              <th>User Role</th>
              <th>User Email</th>
              <th>Region</th>
              <th>District</th>
              <th>User CreatedAt</th>
              <th>Admin Action</th>
              <th>Others Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-full h-10 w-10">
                        <img
                          src={user?.photoURL || 'https://i.ibb.co.com/cKMpwWDT/images-1.png'}
                          alt="Rider Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      {/* <div className="font-bold">{rider.riderName}</div>
                      <div className="text-sm opacity-50">{user.role}</div> */}
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.region}</td>
                <td>{user.district}</td>
                <td>
                  {new Date(user.createdAt).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>

                <td className="space-x-2.5">
                  {!user.isPermanentAdmin &&
                    (user.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm bg-red-800 text-white hover:bg-primary hover:text-black text-xs"
                      >
                        <FiShieldOff />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-green-800 text-white hover:bg-primary hover:text-black text-xs"
                      >
                        <FaUserShield />
                      </button>
                    ))}
                </td>

                <td className="space-x-2.5">
                  <button
                    onClick={() => handleDeleteation(user)}
                    className="btn btn-sm bg-red-600 text-white hover:bg-primary hover:text-black text-xs"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
