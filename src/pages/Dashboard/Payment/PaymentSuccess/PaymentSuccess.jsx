import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  // get the id from url after payment seccussfully
  const [serachParams] = useSearchParams();
  // store the id
  const sessionId = serachParams.get('session_id');

  const axiosSecure = useAxiosSecure();

  // console.log(sessionId);

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
    <div>
      <h2 className="text-3xl font-bold capitalize mb-10">payment success</h2>
      <div>
        <p>Your Transaction ID : {paymentInfo.transactionId}</p>
        <p>Your Tracking ID : {paymentInfo.trackingId}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
