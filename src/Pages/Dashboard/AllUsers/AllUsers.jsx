import { useQuery } from '@tanstack/react-query';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

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
              <th>Action</th>
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
                  <button
                    onClick={() => handleDeleteation(user)}
                    className="btn btn-sm hover:bg-primary text-xs"
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
