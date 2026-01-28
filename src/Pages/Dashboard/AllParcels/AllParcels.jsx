/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { GoUnverified } from 'react-icons/go';
import { MdDeleteSweep } from 'react-icons/md';
import Search from '../../../Components/Search';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const AllParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const [searchText, setSearchText] = useState('');

  // 1️⃣ USERS QUERY (FIRST)
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // 2️⃣ PARCELS QUERY (DEPENDENT ON USERS)
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['allParcels', searchText],
    enabled: !!user?.email && !usersLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?search=${searchText}`);
      return res.data;
    },
  });
  const totalParcels = parcels.length;
  const unPaidParcels = parcels.filter((p) => p.deliveryStatus?.toLowerCase() === 'unpaid').length;
  const paidParcels = parcels.filter((p) => p.paymentStatus?.toLowerCase() === 'paid').length;
  const parcelsToPickup = parcels.filter(
    (p) => p.deliveryStatus?.toLowerCase() === 'pending-pickup',
  ).length;

  const handleDeleteParcel = (parcelId) => {
    // console.log('Delete parcel with ID:', parcelId);
    axiosSecure.delete(`/parcels/${parcelId}`).then((res) => {
      // console.log('deleted parcel', res.data);
      if (res.data.deletedCount) {
        refetch();
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 mb-4 font-semibold text-xl px-2">
          <div className="">
            Total Parcels: <span>{totalParcels}</span>
          </div>
          <div className="">
            Payable Parcels: <span>{unPaidParcels}</span>
          </div>
          <div className="text-green-600">
            Paid Parcels: <span>{paidParcels}</span>
          </div>
          <div className="text-yellow-600">Parcels To Pickup: {parcelsToPickup}</div>
          {/* <div className="text-red-600">
          Rejected: <span>{totalRejected}</span>
        </div> */}
        </div>
        <div>
          {/* <p>{searchText}</p> */}
          <Search placeholder="Search Parcel..." onSearch={setSearchText} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Number</th>
              <th>Profile Info</th>
              <th>Cost</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Receiver Region</th>
              <th>Receiver District</th>

              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
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
                <td>{parcel.cost}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.receiverDistrict}</td>

                <td className="capitalize ">
                  {parcel.paymentStatus === 'paid' ? (
                    <span className="px-3 py-2 bg-green-400 text-black btn-disabled">Paid</span>
                  ) : (
                    <span className=" bg-primary px-3 py-2">
                      {parcel.paymentStatus?.replace('-', ' ')?.trim()}
                    </span>
                  )}
                </td>

                <td>
                  <span className="bg-yellow-200 px-3 py-3 rounded-lg text-green-900 capitalize">
                    {parcel.deliveryStatus?.replace('-', ' ')?.trim()}
                  </span>
                </td>

                <td className="space-x-2">
                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <GoUnverified />
                  </button>

                  <button className="btn btn-sm btn-square hover:bg-primary">
                    <FaRegEdit />
                  </button>

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        handleDeleteParcel(parcel._id);
                      }}
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

export default AllParcels;
