import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const handlePaymentDetails = (parcelId) => {
    console.log(parcelId);
  };

  const handleTransactionDelete = (parcelId) => {
    console.log(parcelId);

    let timerInterval;
    Swal.fire({
      title: 'Deleting transaction...',
      html: 'Please wait <b></b> ms',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector('b');
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(async (result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // 👇 এখানেই DELETE API হবে
        const res = await axiosSecure.delete(`/payments/${parcelId}`);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Payment deleted successfully!',
            timer: 1500,
            showConfirmButton: false,
          });

          queryClient.invalidateQueries(['payments']);
        }
      }
    });
  };
  return (
    <div>
      <h2>Payment History : {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Parcel Info</th>
              <th>Recipient Info</th>
              <th>Tracking Number</th>
              <th>Payment Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.parcelName}</td>
                <td>Quality Control Specialist</td>
                <td>{payment?.trackingId?.slice(-8) || 'N/A'}</td>
                <td>$ {payment.amount}</td>
                <td className="space-x-2.5">
                  <button
                    onClick={() => handlePaymentDetails(payment._id)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleTransactionDelete(payment._id)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
