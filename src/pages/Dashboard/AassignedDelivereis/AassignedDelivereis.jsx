import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AassignedDelivereis = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ['parcels', user.email, 'driver-assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`,
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status };

    let message = `Parcel Status is updated with ${status}`;
    axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: 'Parcel !',
          text: message,
          icon: 'success',
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl">Aassigned Delivereis {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Region</th>
              <th>cost</th>
              <th>Status</th>
              <th>trackingId</th>
              <th>Action</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.senderRegion}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.paymentStatus}</td>
                <td>{parcel.trackingId}</td>
                <td className="space-x-2.5">
                  {parcel.deliveryStatus === 'driver-assigned' ? (
                    <>
                      <button
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider-arriving')}
                        className="btn btn-dash text-red-300"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black">Reject</button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td className="space-x-2.5">
                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-picked-up')}
                    className="btn btn-active text-red-300"
                  >
                    Mark On Picked Up
                  </button>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-delivered')}
                    className="btn btn-dash text-red-300"
                  >
                    Mark On Delivery
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

export default AassignedDelivereis;
