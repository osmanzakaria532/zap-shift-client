/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // useQuery to fetch parcels data
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['allParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels/admin'); // admin endpoint
      return res.data;
    },
  });

  if (isLoading) {
    return <div>পার্সেল লোড হচ্ছে...</div>;
  }
  return (
    <div>
      <h2 className="text-2xl">All Parcels {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Parcel Name</th>
              <th>Sender Email</th>
              <th>Sender Region</th>
              <th>Sender District</th>
              <th>Receiver Region</th>
              <th>Receiver District</th>
              <th>Parcel Type</th>
              <th>Weight</th>
              <th>Total Cost</th>
              <th>Payment Status</th>
              <th>Delivary Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderEmail}</td>
                <td>{parcel.senderRegion}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.cost}</td>

                <td>
                  {parcel.paymentStatus === 'paid' ? (
                    <p className="bg-primary-content inline-block px-2 py-1 rounded font-medium">
                      Paid
                    </p>
                  ) : (
                    <>
                      <p className="bg-primary-content inline-block px-2 py-1 rounded font-medium">
                        To Pay
                      </p>
                    </>
                  )}
                </td>
                <td>{parcel?.deliveryStatus}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;
