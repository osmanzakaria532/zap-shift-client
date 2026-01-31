/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Container from '../../Components/Container';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxiosSecure';

const ParcelTrack = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { trackingId } = useParams();
  const { data: trackings = [] } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      console.log(res.data);

      return res.data;
    },
  });
  return (
    <div className="py-10">
      <Container>
        <div className=" flex justify-between">
          <h3 className="font-semibold text-xl">My parcels : {trackingId}</h3>
          <p>Logs so far : {trackings.length}</p>
        </div>
        <ul className="timeline timeline-vertical">
          {trackings.map((log) => (
            <li key={log._id}>
              <div className="timeline-start">{new Date(log.createdAt).toLocaleString()}</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box capitalize">{log.detail}</div>
              <hr />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default ParcelTrack;
