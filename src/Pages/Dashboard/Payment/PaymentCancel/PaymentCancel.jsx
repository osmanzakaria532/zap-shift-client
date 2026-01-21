import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="text-center">
        <h2 className="text-3xl font-bold capitalize mb-10">
          Payment is cancelled. please try again
        </h2>
        <Link to="/dashboard/my-parcels">
          <button className="btn btn-primary text-black">Try Again</button>
        </Link>
        <div>
          {/* <p>Your Transaction ID : {paymentInfo.transactionId}</p>
        <p>Your Tracking ID : {paymentInfo.trackingId}</p> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
