import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Container from '../../components/Container';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SendParcel = () => {
  const { register, handleSubmit, control, reset } = useForm();
  // get secure axios instance
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  // get user data from auth context
  const { user } = useAuth();

  // get service centers data from loader
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  // get unique regions
  const regions = [...new Set(regionsDuplicate)];

  // watch senderRegion and receiverRegion fields
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  // function to get districts by region
  const districtsByRegion = (region) => {
    // filter service centers by region
    const filteredRegion = serviceCenters.filter((center) => center.region === region);
    // map to get districts
    const districts = filteredRegion.map((dct) => dct.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log('Parcel data', data);

    // check if parcel is document or non-document
    const isDocument = data.parcelType === 'document';

    // parse parcel weight to float
    const parcelWeight = parseFloat(data.parcelWeight);

    // check if sender and receiver district are same
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log('Total cost:', cost);
    data.cost = cost;
    Swal.fire({
      title: 'aggree with the cost?',
      text: `You will be charged! ${cost} BDT`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm and Contiue Payment!',
    }).then((result) => {
      if (result.isConfirmed) {
        // post parcel data to server
        axiosSecure.post('/parcels', data).then((res) => {
          console.log('after saving data', res.data);

          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        reset();
      }
    });
  };

  return (
    <div className="py-20">
      <Container className="bg-white py-20 px-24 rounded-2xl shadow-lg">
        <h2 className="text-6xl font-extrabold text-secondary">Send Parcel</h2>
        <div className="border border-black/10 mt-[50px] mb-[30px]"></div>

        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* document as parcel name and weight */}
          <div className="">
            <h2 className="text-2xl text-secondary font-extrabold">Enter your parcel details</h2>
            <div className="flex items-center gap-12 my-8">
              <div>
                <input
                  value="document"
                  type="radio"
                  className="radio radio-neutral radio-sm mr-3"
                  defaultChecked
                  id="document"
                  {...register('parcelType')}
                />
                <label htmlFor="document">Document</label>
              </div>
              <div>
                <input
                  value="non-document"
                  type="radio"
                  className="radio radio-neutral radio-sm  mr-3"
                  id="non-document"
                  {...register('parcelType')}
                />
                <label htmlFor="non-document">Non-Document</label>
              </div>
            </div>
          </div>
          <div className="flex gap-8 ">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Parcel Name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Name"
                {...register('parcelName')}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Parcel Weight (KG)</legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Parcel Weight (KG)"
                {...register('parcelWeight')}
              />
            </fieldset>
          </div>

          <div className="border border-black/10 my-[30px]"></div>

          {/*  details */}
          <div className="flex gap-20">
            {/* sender details */}
            <div className="w-full">
              <h2 className="text-secondary text-lg font-extrabold mb-[30px]">Sender Details</h2>
              <fieldset className="fieldset ">
                <div className="flex gap-8">
                  <div className="w-full">
                    <legend className="fieldset-legend">Sender Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Sender Name"
                      defaultValue={user?.displayName}
                      {...register('senderName')}
                    />
                  </div>
                  {/*  */}
                  <div className="w-full">
                    <legend className="fieldset-legend">Sender Email</legend>
                    <input
                      type="email"
                      className="input w-full"
                      placeholder="Sender Email"
                      defaultValue={user?.email}
                      readOnly
                      {...register('senderEmail')}
                    />
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-full">
                    <legend className="fieldset-legend">Sender Contact No</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Sender Contact No"
                      {...register('senderContactNo')}
                    />
                  </div>
                  <div className="w-full">
                    <legend className="fieldset-legend">Sender Pickup Wire house</legend>
                    <select
                      defaultValue="Sender Wire house"
                      className="select appearance-none  w-full"
                      {...register('senderPickupWirehouse')}
                    >
                      <option disabled={true}>Sender Wire house</option>
                      <option>Crimson</option>
                      <option>Amber</option>
                      <option>Velvet</option>
                    </select>
                  </div>
                </div>
                {/*  */}

                <div>
                  <legend className="fieldset-legend">Sender Region</legend>
                  <select
                    defaultValue="Select Your Region"
                    className="select appearance-none  w-full"
                    {...register('senderRegion')}
                  >
                    <option disabled={true}>Select Your Region</option>
                    {regions.map((region, index) => (
                      <option value={region} key={index}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <legend className="fieldset-legend">Sender Dristrict</legend>
                  <select
                    defaultValue="Select Your Districts"
                    className="select appearance-none  w-full"
                    {...register('senderDistrict')}
                  >
                    <option disabled={true}>Select Your Districts</option>
                    {districtsByRegion(senderRegion).map((district, index) => (
                      <option defaultValue={district?.region} value={district} key={index}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <legend className="fieldset-legend">PickUp Instraction</legend>
                  <textarea
                    className="w-full border px-3 py-2 rounded border-[#CBD5E1]"
                    placeholder="PickUp Instruction"
                    rows={4}
                    cols={8}
                    {...register('senderPickupInstruction')}
                  />
                </div>
              </fieldset>
            </div>

            {/* receiver details */}
            <div className="w-full">
              <h2 className="text-secondary text-lg font-extrabold mb-[30px]">Receiver Details</h2>
              <fieldset className="fieldset ">
                <div className="flex gap-8">
                  <div className="w-full">
                    <legend className="fieldset-legend">Receiver Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Receiver Name"
                      {...register('receiverName')}
                    />
                  </div>
                  {/*  */}
                  <div className="w-full">
                    <legend className="fieldset-legend">Receiver Email</legend>
                    <input
                      type="email"
                      className="input w-full"
                      placeholder="Receiver Email"
                      {...register('receiverEmail')}
                    />
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-full">
                    <legend className="fieldset-legend">Receiver Contact No</legend>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Receiver Contact No"
                      {...register('receiverContactNo')}
                    />
                  </div>
                  <div className="w-full">
                    <legend className="fieldset-legend">Receiver Delivery Wire house</legend>
                    <select
                      defaultValue="Receiver Wire house"
                      className="select appearance-none  w-full"
                    >
                      <option disabled={true}>Receiver Wire house</option>
                      <option>Crimson</option>
                      <option>Amber</option>
                      <option>Velvet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <legend className="fieldset-legend">Receiver Region</legend>
                  <select
                    defaultValue="Select Your Region"
                    className="select appearance-none  w-full"
                    {...register('receiverRegion')}
                  >
                    <option disabled={true}>Select Your Region</option>
                    {regions.map((region, index) => (
                      <option value={region} key={index}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <legend className="fieldset-legend">Receiver Districts</legend>
                  <select
                    defaultValue="Select Your Districts"
                    className="select appearance-none  w-full"
                    {...register('receiverDistrict')}
                  >
                    <option disabled={true}>Select Your Districts</option>
                    {districtsByRegion(receiverRegion).map((region, index) => (
                      <option value={region} key={index}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <legend className="fieldset-legend">Delivery Instruction</legend>
                  <textarea
                    className="w-full border px-3 py-2 rounded border-[#CBD5E1]"
                    placeholder="Delivery Instruction"
                    rows={4}
                    cols={8}
                    {...register('receiverDeliveryInstruction')}
                  />
                </div>
              </fieldset>
            </div>
          </div>

          {/* time */}

          <div className="mt-[50px]">* Pickup Time 4pm-7pm Approx</div>
          <button className="btn btn-primary mt-4 text-black">Proceed to confirm booking</button>
        </form>
      </Container>
    </div>
  );
};

export default SendParcel;
