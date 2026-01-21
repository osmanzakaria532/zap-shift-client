/* eslint-disable no-unused-vars */
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../Components/Container';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SendParcel = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const regions = [...new Set(regionsDuplicate)];
  const districtsByRegion = (region) => {
    // filter service centers by region
    const filteredRegion = serviceCenters.filter((center) => center.region === region);
    // map to get districts
    const districts = filteredRegion.map((dct) => dct.district);
    return districts;
  };
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  // const navigate = useNavigate();

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === 'document';
    const parcelWeight = parseFloat(data.parcelWeight);
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

    data.cost = cost;
    Swal.fire({
      title: 'agree with the cost?',
      text: `You will be charged! ${cost} BDT`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm and Contiue Payment!',
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel to thae database
        axiosSecure.post('/parcels', data).then((res) => {
          // console.log('after saning parcel in database', res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Parcel has created. Please Pay ',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  // const handleSendParcel = (data) => {
  // console.log('Parcel data', data);
  // check if parcel is document or non-document
  // parse parcel weight to float
  // check if sender and receiver district are same
  //   console.log('Total cost:', cost);
  //   data.cost = cost;
  //   Swal.fire({
  //     title: 'aggree with the cost?',
  //     text: `You will be charged! ${cost} BDT`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Confirm and Contiue Payment!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  // post parcel data to server
  //       axiosSecure.post('/parcels', data).then((res) => {
  //         console.log('after saving data', res.data);

  //         if (res.data.insertedId) {
  //           navigate('/dashboard/my-parcels');
  //           Swal.fire({
  //             position: 'top-end',
  //             icon: 'success',
  //             title: 'Your work has been saved',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       });
  //       reset();
  //     }
  //   });
  // };

  return (
    <div className="py-10 md:py-20">
      <Container className="bg-white py-10 md:py-20 px-2 md:px-24 md:rounded-2xl shadow-lg">
        <h2 className="text-4xl md:text-6xl font-extrabold text-secondary">Send Parcel</h2>
        <div className="border border-black/10 mt-6 md:mt-12.5 mb-3.5 md:mb-7.5"></div>

        <div>
          <h2 className="text-2xl text-secondary font-extrabold">Enter your parcel details</h2>
          <form onSubmit={handleSubmit(handleSendParcel)}>
            {/* document or non-document */}
            <div>
              <div className="flex items-center gap-12 my-8">
                <div>
                  <input
                    type="radio"
                    className="radio radio-neutral radio-sm mr-3"
                    id="document"
                    value="document"
                    defaultChecked
                    {...register('parcelType', { required: true })}
                  />
                  <label htmlFor="document">Document</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="radio radio-neutral radio-sm mr-3"
                    id="non-document"
                    value="non-document"
                    {...register('parcelType', { required: true })}
                  />
                  <label htmlFor="non-document">Non-Document</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-8 ">
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
                  type="text"
                  className="input w-full"
                  placeholder="Parcel Weight (KG)"
                  {...register('parcelWeight')}
                />
              </fieldset>
            </div>

            <div className="border border-black/10 my-7.5"></div>

            {/*  details */}
            <div className="flex flex-col md:flex-row md:gap-20">
              {/* sender details */}
              <div className="w-full">
                <h2 className="text-secondary text-lg font-extrabold mb-7.5">Sender Details</h2>
                <div>
                  {/* Sender Name ------------------ */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Sender Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Sender Name"
                      defaultValue={user?.displayName}
                      {...register('senderName')}
                    />
                  </fieldset>
                  {/* Sender Email ------------------- */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Sender Email</legend>
                    <input
                      type="email"
                      className="input w-full"
                      placeholder="Sender Email"
                      defaultValue={user?.email}
                      {...register('senderEmail')}
                    />
                  </fieldset>
                  <div className="flex flex-col md:flex-row gap-x-8">
                    {/* Sender Contact -------------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Sender Contact No</legend>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Sender Contact No"
                        {...register('senderContact')}
                      />
                    </fieldset>

                    {/* Sender Wire House --------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Sender Pickup Wire house</legend>
                      <select
                        defaultValue="Sender Wire house"
                        className="select appearance-none  w-full"
                        {...register('senderHouse')}
                      >
                        <option disabled={true}>Sender Wire house</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Sender Region ------------------ */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Sender Region</legend>
                      <select
                        defaultValue="Select Your Region"
                        className="select appearance-none w-full"
                        {...register('senderRegion')}
                      >
                        <option disabled={true}>Select Your Region</option>
                        {regions.map((region, index) => (
                          <option key={index} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </fieldset>

                    {/* Sender District --------------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Sender Dristrict</legend>
                      <select
                        defaultValue="Select Your Districts"
                        className="select appearance-none  w-full"
                        {...register('senderDistrict')}
                      >
                        <option disabled={true}>Select Your Districts</option>
                        {districtsByRegion(senderRegion).map((dristrict, index) => (
                          <option key={index} value={dristrict}>
                            {dristrict}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>

                  {/* Sender Instraction -------------  */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">PickUp Instraction</legend>
                    <textarea
                      className="w-full border px-3 py-2 rounded border-[#CBD5E1]"
                      placeholder="PickUp Instruction"
                      rows={4}
                      cols={8}
                      {...register('senderInstraction')}
                    />
                  </fieldset>
                </div>
              </div>

              {/* Receiver details */}
              <div className="w-full">
                <h2 className="text-secondary text-lg font-extrabold mb-7.5">Receiver Details</h2>
                <div>
                  {/* Receiver name ------------- */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Receiver Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Receiver Name"
                      {...register('receiverName')}
                    />
                  </fieldset>

                  {/* Receiver Email -------------- */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Receiver Email</legend>
                    <input
                      type="email"
                      className="input w-full"
                      placeholder="Receiver Email"
                      {...register('receiverEmail')}
                    />
                  </fieldset>
                  <div className="flex flex-col md:flex-row gap-x-8">
                    {/* Receiver Contact -------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Receiver Contact No</legend>
                      <input
                        type="number"
                        className="input w-full"
                        placeholder="Receiver Contact No"
                        {...register('receiverContact')}
                      />
                    </fieldset>

                    {/* Receiver House ------------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Receiver Wire house</legend>
                      <select
                        defaultValue="Receiver Wire house"
                        className="select appearance-none  w-full"
                        {...register('receiverHouse')}
                      >
                        <option disabled={true}>Receiver Wire house</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="flex gap-2 md:gap-8">
                    {/* Receiver Region -------------------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Receiver Region</legend>
                      <select
                        defaultValue="Select Your Region"
                        className="select appearance-none w-full"
                        {...register('receiverRegion')}
                      >
                        <option disabled={true}>Select Your Region</option>
                        {regions.map((region, index) => (
                          <option key={index} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </fieldset>

                    {/* Receiver District --------------------- */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Receiver Districts</legend>
                      <select
                        defaultValue="Select Your Districts"
                        className="select appearance-none w-full"
                        {...register('receiverDistrict')}
                      >
                        <option disabled={true}>Select Your Districts</option>
                        {districtsByRegion(receiverRegion).map((dristrict, index) => (
                          <option key={index} value={dristrict}>
                            {dristrict}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>

                  {/* Receiver Instraction ------------------------ */}
                  <fieldset className="fieldset">
                    <div className="">
                      <legend className="fieldset-legend">Delivery Instruction</legend>
                      <textarea
                        className="w-full border px-3 py-2 rounded border-[#CBD5E1]"
                        placeholder="Delivery Instruction"
                        rows={4}
                        cols={8}
                        {...register('receiverInstruction')}
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* time and submit btn */}
            <div className="mt-6 6md:mt-12.5 text-sm md:text-base">
              * Pickup Time 4pm-7pm Approx
            </div>
            <button className="btn btn-primary mt-4 text-black w-full md:w-auto text-sm md:text-base">
              Proceed to confirm booking
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SendParcel;
