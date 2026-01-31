/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ComplatedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver-assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel-delivered`,
      );
      console.log(res.data);
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cose * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-xl px-3">Complated Deliveries: {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>
                Profile <span className="text-[10px]">( Parcel Sender )</span> Info
              </th>
              <th>Parcel name</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Tracking ID</th>
              <th>Receiver Region</th>
              <th>Receiver District</th>
              <th>Delivary Status</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>

              {/* <th>Other Action</th> */}
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
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.receiverDistrict}</td>
                <td className="capitalize font-semibold">
                  <span className="bg-yellow-200 px-3 py-3 rounded-lg text-green-900">
                    {parcel?.deliveryStatus?.replace('-', ' ')?.trim()}
                  </span>
                </td>
                <td>{parcel.cost}</td>
                <td>{calculatePayout(parcel)}</td>
                <td>
                  <button className="btn bg-primary" title="Accept">
                    Cash Out
                  </button>
                </td>

                {/* <td className="space-x-2.5">
                  {parcel.deliveryStatus === 'driver-assigned' ? (
                    <>
                      <button
                        // onClick={() => handleDeliveryStatusUpdate(parcel, 'rider-arriving')}
                        className="btn btn-sm btn-square hover:bg-primary"
                        title="Accept"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        // onClick={() => handleRejectDelivery(parcel)}
                        className="btn btn-sm btn-square hover:bg-error"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td className="">
                  <div className="inline-block mx-2">
                    {parcel.deliveryStatus === 'parcel-pick-up' ? (
                      <span>Parcel pick up</span>
                    ) : (
                      <button
                        // onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-pick-up')}
                        className="btn bg-primary"
                      >
                        Mark as Pick Up
                      </button>
                    )}
                  </div>
                  <button
                    // onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-delivered')}
                    className="btn bg-primary"
                  >
                    Mark as Delivered
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplatedDeliveries;
