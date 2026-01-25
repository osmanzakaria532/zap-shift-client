import { useQuery } from '@tanstack/react-query';
import { AiFillDelete } from 'react-icons/ai';
import { BsPersonCheckFill } from 'react-icons/bs';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import Loading from '../../../Components/Loading';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      // console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleApproval = (id) => {
    console.log('Approve rider with id:', id);
  };

  return (
    <div>
      <h2>Riders Pending Approval: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>Rider Info</th>
              <th>Rider Email</th>
              <th>Rider NTD</th>
              <th>Rider Phone Number</th>
              <th>Region</th>
              <th>District</th>
              <th>Submitted At</th>
              <th>Rider Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
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
                      <div className="font-bold">{rider.riderName}</div>
                      <div className="text-sm opacity-50">{rider?.role || 'User'}</div>
                    </div>
                  </div>
                </td>
                <td>{rider.riderEmail}</td>
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
                <td>{rider.status}</td>

                <td className="space-x-2.5">
                  <button
                    onClick={() => handleApproval(rider._id)}
                    className="btn btn-sm hover:bg-primary text-xs"
                  >
                    <BsPersonCheckFill />
                  </button>
                  <button className="btn btn-sm hover:bg-primary text-xs">
                    <IoPersonRemoveOutline />
                  </button>
                  <button
                    //   onClick={() => handleParcelDelete(parcel._id)}
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

export default ApproveRiders;
