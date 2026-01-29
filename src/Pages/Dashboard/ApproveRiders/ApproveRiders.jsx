/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { AiFillDelete } from 'react-icons/ai';
import { BsPersonCheckFill } from 'react-icons/bs';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // console.log(user.role);

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      // console.log(res.data);
      return res.data;
    },
  });

  const totalRequests = riders.length;
  const totalApproved = riders.filter((r) => r.status === 'approved').length;
  const totalPending = riders.filter((r) => r.status === 'pending').length;
  const totalRejected = riders.filter((r) => r.status === 'rejected').length;

  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log(users);

  if (isLoading) {
    return <Loading />;
  }

  const updatedRiderStatus = (rider, status) => {
    const updatedInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider ${status} successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        refetchUsers(); // ✅ users refetch (এইটাই missing ছিল)
      }
    });
  };

  const handleApproval = (rider) => {
    updatedRiderStatus(rider, 'approved');
  };
  const handleRejection = (rider) => {
    updatedRiderStatus(rider, 'rejected');
  };

  const handleDeleteation = (rider) => {
    // delete logic here
    axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rider deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <div className="flex gap-6 mb-4 font-semibold text-xl">
        <div className="">
          Total Requests: <span>{totalRequests}</span>
        </div>
        <div className="text-green-600">
          Approved: <span>{totalApproved}</span>
        </div>
        <div className="text-yellow-600">Pending: {totalPending}</div>
        <div className="text-red-600">
          Rejected: <span>{totalRejected}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>Rider Info</th>
              <th>Rider Email</th>
              {/* <th>Role</th> */}
              <th>Rider NTD</th>
              <th>Rider Phone Number</th>
              <th>Region</th>
              <th>District</th>
              <th>Submitted At</th>
              <th>Rider Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => {
              const matchedUser = users.find((u) => u.email === rider.email);
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle rounded-full h-10 w-10">
                          <img
                            src={
                              matchedUser?.photoURL || 'https://i.ibb.co.com/cKMpwWDT/images-1.png'
                            }
                            alt="Rider Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{rider.riderName}</div>
                        <div className="text-sm opacity-50">{matchedUser?.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>{rider.email}</td>
                  <td>{rider.riderNTD}</td>
                  <td>{rider.riderPhoneNumber}</td>
                  <td>{rider.riderRegion}</td>
                  <td>{rider.riderDistrict}</td>
                  <td>
                    {new Date(rider.createdAt).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <p
                      className={`capitalize font-semibold ${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}
                    >
                      {rider.status}
                    </p>
                  </td>
                  <td>
                    {/* <p
                      className={`capitalize font-semibold ${rider.workStatus === 'approved' ? 'text-green-800' : 'text-red-500'}`}
                    >
                      {rider.workStatus}
                    </p> */}
                    {rider.workStatus}
                  </td>

                  <td className="space-x-2.5">
                    <button
                      onClick={() => handleApproval(rider)}
                      className="btn btn-sm hover:bg-primary text-xs"
                    >
                      <BsPersonCheckFill />
                    </button>
                    <button
                      onClick={() => handleRejection(rider)}
                      className="btn btn-sm hover:bg-primary text-xs"
                    >
                      <IoPersonRemoveOutline />
                    </button>
                    <button
                      onClick={() => handleDeleteation(rider)}
                      className="btn btn-sm hover:bg-primary text-xs"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
