import { useQuery } from '@tanstack/react-query';
import { FaRegEdit } from 'react-icons/fa';
import { GoUnverified } from 'react-icons/go';
import { MdDeleteSweep } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
  // const { role } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // useQuery to fetch parcels data
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    // enabled: !!user?.email && !!role, // role & email available na thakle fetch hobe na
    queryFn: async () => {
      // if (!user?.email || !role) return [];
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // // console.log('in my parcel ', parcels);

  // // Handle delete parcel
  const handleParcelDelete = (parcelId) => {
    console.log('Delete parcel with ID:', parcelId);

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
          console.log('deleted parcel', res.data);
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
  // const handlePayment = async (parcel) => {
  //   console.log(parcel);

  //   const paymentInfo = {
  //     cost: parcel.cost,
  //     parcelId: parcel._id,
  //     senderEmail: parcel.senderEmail,
  //     parcelName: parcel.parcelName,
  //   };

  //   const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
  //   console.log(res.data);
  //   //
  //   window.location.assign(res.data.url);
  // };
  return (
    <div>
      <h3>My parcels : {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email</th>
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
                <td>{parcel.senderEmail}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>
                  {parcel.paymentStatus === 'paid' ? (
                    <span className="text-black btn btn-sm btn-square bg-primary">Paid</span>
                  ) : (
                    <>
                      {/* <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-sm btn-square hover:bg-primary">Pay</button>
                    </Link> */}

                      <button
                        // onClick={() => handlePayment(parcel)}
                        className="btn btn-sm btn-square hover:bg-primary"
                      >
                        Pay
                      </button>
                    </>
                  )}
                </td>
                <td>{parcel?.deliveryStatus}</td>

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
