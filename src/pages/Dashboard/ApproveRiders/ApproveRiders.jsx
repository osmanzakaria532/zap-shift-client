import { useQuery } from '@tanstack/react-query';
import { FaRegTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        console.log('Modified');
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Your application has been ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    console.log(rider);
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = (rider) => {
    console.log(rider);
    updateRiderStatus(rider, 'reject');
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>NID</th>
            <th>Phone Number</th>
            <th>Driving License Number</th>
            <th>Bike Model</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <th>{index + 1}</th>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.nid_number}</td>
              <td>{rider.phoneNumber}</td>
              <td>{rider.drivingLicenseNumber}</td>
              <td>{rider.bikeModel}</td>
              <td
                className={`font-bold ${
                  rider.status === 'approved' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {rider.status}
              </td>
              <td className="space-x-2.5">
                <button onClick={() => handleApproval(rider)} className="btn btn-xs">
                  <FaUserCheck />
                </button>
                <button onClick={() => handleRejection(rider)} className="btn btn-xs">
                  <IoPersonRemove />
                </button>
                <button className="btn btn-xs">
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRiders;
