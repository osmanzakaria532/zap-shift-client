import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const { user } = useAuth();

  // ✅ 1️⃣ Pending-pickup parcels fetch
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ['parcels', 'pending-pickup', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`);
        return res.data;
      } catch (error) {
        console.error('Parcel fetch error:', error.response?.data || error.message);
        throw error;
      }
    },
  });

  // ✅ 2️⃣ Selected parcel অনুযায়ী riders fetch
  const { data: riders = [], refetch: ridersRefetch } = useQuery({
    queryKey: ['riders', selectedParcel?.senderDistrict],
    enabled: !!selectedParcel?.senderDistrict,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/riders?status=approved&riderDistrict=${selectedParcel.senderDistrict}&workStatus=available`,
        );
        return res.data;
      } catch (error) {
        console.error('Riders fetch error:', error.response?.data || error.message);
        throw error;
      }
    },
  });

  // ✅ 3️⃣ Modal open with selected parcel
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
    ridersRefetch(); // ensure riders fetch every time modal opens
  };

  // ✅ 4️⃣ Assign rider to parcel
  const handleAssignRider = async (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };

    try {
      const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo);
      if (res.data.modifiedCount) {
        riderModalRef.current.close();
        parcelsRefetch(); // refresh parcels list
        Swal.fire({
          title: 'Success!',
          text: `Rider ${rider.name} has been assigned.`,
          icon: 'success',
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Assign rider error:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to assign rider. Try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assign Riders ({parcels.length})</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    className="btn btn-xs btn-primary text-black"
                    onClick={() => openAssignRiderModal(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider modal */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-3xl">
          <h3 className="font-bold text-lg mb-3">
            Available Riders ({riders.length}) for "{selectedParcel?.parcelName}"
          </h3>

          <div className="overflow-x-auto mb-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, idx) => (
                  <tr key={rider._id}>
                    <th>{idx + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-success text-black"
                        onClick={() => handleAssignRider(rider)}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form method="dialog" className="text-right">
            <button className="btn btn-sm btn-secondary text-white">Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
