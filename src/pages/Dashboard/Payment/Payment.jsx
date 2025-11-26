import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      // Fetch payment details for the parcel
      const res = await axiosSecure.get(`http://localhost:5000/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel.parcelId,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-10">
        please Pay <span className="underline">$ {parcel.cost}</span> for: {parcel.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn hover:bg-primary">
        Pay
      </button>
    </div>
  );
};

export default Payment;
