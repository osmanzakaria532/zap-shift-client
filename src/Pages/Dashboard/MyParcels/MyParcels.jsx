import { useQuery } from '@tanstack/react-query';
import { FaRegEdit } from 'react-icons/fa';
import { GoUnverified } from 'react-icons/go';
import { MdDeleteSweep } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  // useQuery to fetch parcels data
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    enabled: !!user?.email,
    // enabled: !!user?.email && !!role, // role & email available na thakle fetch hobe na

    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log('USER EMAIL:', user?.email);
  // console.log('My Parcels', parcels);

  // console.log('in my parcel ', parcels);

  // Handle delete parcel
  const handleParcelDelete = (parcelId) => {
    // console.log('Delete parcel with ID:', parcelId);

    // Implement delete functionality here
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
          // console.log('deleted parcel', res.data);
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

  // handle pament
  const handlePayment = async (parcel) => {
    // console.log(parcel);

    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      frontendUrl: window.location.origin, // ekhane dynamic frontend URL pathacchi
      trackingId: parcel.trackingId,
    };

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    // console.log(res.data);
    window.location.assign(res.data.url);
  };
  return (
    <div>
      <h3 className="font-semibold text-xl">My parcels : {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Profile Info</th>
              <th>Parcel name</th>
              <th>Cost</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Tracking ID</th>
              <th>Receiver Region</th>
              <th>Receiver District</th>
              <th>Payment Status</th>
              <th>Delivary Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 rounded-full">
                        <img src={parcel.senderPhoto} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold capitalize">{parcel.senderName}</div>
                      <div className="text-sm opacity-50">
                        <span>{parcel.senderRegion}</span>, <span>{parcel.senderDistrict}</span>
                      </div>
                      <div className="text-xs">{parcel.senderEmail}</div>
                    </div>
                  </div>
                </td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>
                  <Link to={`/parcel-tracking/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                </td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>
                  {parcel.paymentStatus === 'paid' ? (
                    <span className="text-black btn btn-sm px-6 btn-square bg-green-400 btn-disabled">
                      Paid
                    </span>
                  ) : (
                    <>
                      {/* ONE PROCESS TO PAYMENT  */}
                      {/* <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm btn-square hover:bg-primary">Pay</button>
                      </Link> */}

                      {/* SECOND PROCESS TO PAYMENT */}
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-sm px-6 btn-square hover:bg-primary"
                      >
                        Pay
                      </button>
                    </>
                  )}
                </td>
                <td className="capitalize font-semibold">
                  <span className="bg-yellow-200 px-3 py-3 rounded-lg text-green-900">
                    {parcel?.deliveryStatus?.replace('-', ' ')?.trim()}
                  </span>
                </td>

                <td className="space-x-2.5">
                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <GoUnverified />
                  </button>
                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <FaRegEdit />
                  </button>
                  {role === 'admin' && (
                    <button
                      onClick={() => handleParcelDelete(parcel._id)}
                      className="btn btn-sm btn-square hover:bg-primary"
                    >
                      <MdDeleteSweep />
                    </button>
                  )}
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
