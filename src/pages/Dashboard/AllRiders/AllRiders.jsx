import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  // ✅ Fetch all approved riders
  const {
    data: riders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['allRiders'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/riders?status=approved');
        return res.data;
      } catch (err) {
        console.error('Riders fetch error:', err.response?.data || err.message);
        throw err;
      }
    },
  });

  // ✅ Filter riders by search
  const filteredRiders = riders.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) return <p>Loading riders...</p>;
  if (isError) return <p>Error: {error.response?.data || error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Riders ({riders.length})</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
        </div>
      </div>

      {/* Riders Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Work Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.riderDistrict}</td>
                <td>{rider.workStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRiders;
