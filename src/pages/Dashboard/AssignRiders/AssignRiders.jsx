import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  // 🚀 pending-pickup স্ট্যাটাসের সব parcel লোড করার জন্য useQuery ব্যবহার করা হয়েছে
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ['parcels', 'pending-pickup'],
    // 👉 এই কুয়ারির জন্য ইউনিক key (cache + refetch control)

    queryFn: async () => {
      // 👉 API call — শুধু pending-pickup parcel আনবে
      const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
      return res.data; // 👉 server থেকে পাওয়া parcels return
    },
  });

  // 🚀 selectedParcel থাকা মাত্র rider load করার জন্য useQuery চলবে
  // enabled: !!selectedParcel → selectedParcel true হলে কুয়ারি চালু হবে
  // queryKey → cache আলাদা রাখার জন্য district অনুযায়ী unique key
  // queryFn → approved + available রাইডার fetch করা

  const { data: riders = [] } = useQuery({
    queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],

    enabled: !!selectedParcel, // 👉 selectedParcel না থাকলে API কল হবে না

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&riderDistrict=${selectedParcel.senderDistrict}&workStatus=available`,
      );
      return res.data; // 👉 rider list return
    },
  });

  //   console.log(selectedParcel);
  console.log(selectedParcel?.senderDistrict);

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };
    axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo).then((res) => {
      if (res.data.modifiedCount) {
        riderModalRef.current.close();
        parcelsRefetch();
        Swal.fire({
          title: 'Parcel !',
          text: 'Rider has been assigned.',
          icon: 'success',
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-2xl">Assgign Riders : {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup district</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-xs bg-primary"
                  >
                    Assgin Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={riderModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders {riders.length}</h3>
          <div className="modal-action flex flex-col">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Actionr</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={rider._id}>
                      <th>{index + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-xs bg-primary"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
