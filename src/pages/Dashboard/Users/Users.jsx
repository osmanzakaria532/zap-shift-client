import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { FaShieldDog } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  // tracking logged in user
  const { user: currentUser } = useAuth();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  // console.log(users);

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: 'admin' };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName} Maked as as admin `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: 'user' };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName} remove from admin `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // remove user from database
  const handleRemoveUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete user: ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${user._id}/delete`);

          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'User has been removed.', 'success');
            refetch(); // refresh user list
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete user', error);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 mb-10">
        <h2 className="text-3xl font-bold">All Users ( {users.length} )</h2>
        <div className="relative">
          <label className="input w-xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              required
              placeholder="Search"
            />
          </label>
          <p className="absolute left-1/2 -bottom-7">search Text {search}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>User photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Role</th>
              <th>Region</th>
              <th>District</th>
              <th>Admin Action</th>
              <th>Other Action</th>
              <th>Register At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-14 w-14 rounded-full">
                      <img
                        src={user?.photoURL}
                        alt="Avatar Tailwind CSS Component"
                        className=" h-14 w-14 rounded-full object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{user?.displayName}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>
                  <div className="text-sm opacity-50">{user.role}</div>
                </td>
                <td>
                  <div className="text-sm">{user.region}</div>
                </td>
                <td>
                  <div className="text-sm ">{user.district}</div>
                </td>
                <td>
                  {user.email !== currentUser.email ? (
                    user.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-xs bg-red-700"
                        title="Remove Admin"
                      >
                        <FaShieldDog className="text-white" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs bg-green-800"
                        title="Make Admin"
                      >
                        <FaUserShield className="text-white" />
                      </button>
                    )
                  ) : null}
                </td>
                <td>
                  {user.email !== currentUser.email && (
                    <button
                      onClick={() => handleRemoveUser(user)}
                      className="btn btn-xs bg-red-700 tooltip"
                      data-tip="Delete User"
                    >
                      <MdDelete className="text-white" />
                    </button>
                  )}
                </td>
                <td>{user.createdArt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
