import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  //  get the id from url after payment seccussfully and store the id and this process tootally maked after payment second process apllyed
  const [serachParams] = useSearchParams();
  const sessionId = serachParams.get('session_id');

  const [paymentInfo, setPaymentInfo] = useState({});

  // check the payment from backend api
  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
        console.log(res.data);
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
        <h2 className="text-3xl font-bold capitalize mb-10">payment success</h2>
        <div>
          <p>Your Transaction ID : {paymentInfo.transactionId}</p>
          <p>Your Tracking ID : {paymentInfo.trackingId}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
