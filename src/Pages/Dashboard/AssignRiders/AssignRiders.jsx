import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {
  const [selecetedParcel, setSelectedParcel] = useState('');
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const { data: parcels = [], refetch: parcelsRefatch } = useQuery({
    queryKey: ['parcels', 'pending-pickup'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`);
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ['riders', selecetedParcel?.senderDistrict, 'available'],
    enabled: !!selecetedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&riderDistrict=${selecetedParcel?.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  const handleOpenRiderModalRef = (parcel) => {
    setSelectedParcel(parcel);
    console.log(parcel);

    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.riderName,
      parcelId: selecetedParcel._id,
      trackingId: selecetedParcel.trackingId,
    };
    axiosSecure.patch(`/parcels/${selecetedParcel._id}`, riderInfo).then((res) => {
      if (res.data.modifiedCount) {
        riderModalRef.current.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rider deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        parcelsRefatch();
      }
    });
  };

  return (
    <div>
      <h3 className="text-xl px-3">Parcels to be Assigned : {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Sender Info</th>
              <th>Parcel name</th>
              <th>Cost</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Tracking ID</th>
              <th>Pickup Address</th>
              <th>Receiver Region</th>
              <th>Receiver District</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
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
                <td>{parcel.trackingId}</td>
                <td>
                  <div className="">
                    {parcel.senderRegion}, {parcel.senderDistrict}
                  </div>
                </td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>
                  <span className="text-black btn btn-sm px-6 btn-square bg-green-400 btn-disabled capitalize">
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="capitalize font-semibold">
                  <span className="bg-yellow-200 px-3 py-3 rounded-lg text-green-900">
                    {parcel?.deliveryStatus?.replace('-', ' ')?.trim()}
                  </span>
                </td>

                <td className="space-x-2.5">
                  <button
                    onClick={() => handleOpenRiderModalRef(parcel)}
                    className="btn bg-primary"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Riders: {riders.length}!</h3>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  rider?.photoURL || 'https://i.ibb.co.com/cKMpwWDT/images-1.png'
                                }
                                alt="Avatar Tailwind CSS Component"
                                className="rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{rider.riderName}</div>
                          </div>
                        </div>
                      </td>
                      <td>{rider.email}</td>
                      <th>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary px-6 py-3.5 text-black btn-xs"
                        >
                          Assign
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AssignRiders;
