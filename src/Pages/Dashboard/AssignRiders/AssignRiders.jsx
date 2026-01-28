/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', 'pending-pickup'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`);
      console.log(res.data);

      return res.data;
    },
  });

  console.log(parcels);

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
                  <button className="btn bg-primary">Assign Rider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiders;
