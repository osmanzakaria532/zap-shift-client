import { useQuery } from '@tanstack/react-query';
import { FaRegEdit } from 'react-icons/fa';
import { GoUnverified } from 'react-icons/go';
import { MdDeleteSweep } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // useQuery to fetch parcels data
  const { data: parcels = [], refetch } = useQuery({
    //
    queryKey: ['myParcels', user?.email],
    // fetch function
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // Handle delete parcel
  const handleParcelDelete = (parcelId) => {
    // Implement delete functionality here
    console.log('Delete parcel with ID:', parcelId);

    // Confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your parcel has been canceled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, I'm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${parcelId}`).then((res) => {
          console.log('deleted response', res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Parcel has been deleted.',
              icon: 'success',
            });
            // Refetch parcels after deletion
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <h3>my parcels : {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Payment</th>
              <th>Delivary Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>
                  {parcel.delivaryStatus === 'paid' ? (
                    <span className="text-gray-400">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-sm btn-square hover:bg-primary">Pay</button>
                    </Link>
                  )}
                </td>
                <td>Blue</td>

                <td className="space-x-2.5">
                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <GoUnverified />
                  </button>
                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-sm btn-square hover:bg-primary"
                  >
                    <MdDeleteSweep />
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

export default MyParcels;
