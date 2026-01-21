import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      // Fetch payment details for the parcel
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return Loading;
  }

  // const handlePayment = async () => {
  //   const paymentInfo = {
  //     cost: parcel.cost,
  //     parcelId: parcel.parcelId,
  //     senderEmail: parcel.senderEmail,
  //     parcelName: parcel.parcelName,
  //   };

  //   const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
  //   console.log(res.data);
  //   window.location.href = res.data.url;
  // };
  return (
    <div>
      <h2 className="text-2xl  mb-10">
        please Pay <span className="underline font-bold">$ {parcel.cost} </span>
        for :<span> {parcel.parcelName}</span>
      </h2>
      <button
        // onClick={handlePayment}
        className="btn hover:bg-primary"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
