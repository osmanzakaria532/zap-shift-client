const MyParcels = () => {
  // const { role } = useRole();
  // const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();

  // // useQuery to fetch parcels data
  // const { data: parcels = [], refetch } = useQuery({
  //   queryKey: ['myParcels', user?.email, role],
  //   enabled: !!user?.email && !!role, // role & email available na thakle fetch hobe na
  //   queryFn: async () => {
  //     if (!user?.email || !role) return [];

  //     const res = await axiosSecure.get(`/parcels?email=${user?.email}&role=${role}`);
  //     return res.data;
  //   },
  // });

  // // console.log('in my parcel ', parcels);

  // // Handle delete parcel
  // const handleParcelDelete = (parcelId) => {
  //   // Implement delete functionality here
  //   // console.log('Delete parcel with ID:', parcelId);

  //   // Confirmation dialog
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Your parcel has been canceled!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: "Yes, I'm!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.delete(`/parcels/${parcelId}`).then((res) => {
  //         console.log('deleted response', res.data);
  //         if (res.data.deletedCount) {
  //           Swal.fire({
  //             title: 'Deleted!',
  //             text: 'Your Parcel has been deleted.',
  //             icon: 'success',
  //           });
  //           // Refetch parcels after deletion
  //           refetch();
  //         }
  //       });
  //     }
  //   });
  // };

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
      {/* <h3>my parcels : {parcels.length}</h3> */}
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
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
