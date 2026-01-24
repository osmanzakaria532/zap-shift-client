/* eslint-disable no-unused-vars */
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import riderImg from '../../../src/assets/agent-pending.png';
import Container from '../../Components/Container';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Rider = () => {
  const { register, handleSubmit, control, reset } = useForm();
  // get user & axiosInstance
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get service centers data from loader
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: 'riderRegion' });

  // function to get districts by region
  const districtsByRegion = (region) => {
    // filter service centers by region
    const filteredRegion = serviceCenters.filter((center) => center.region === region);
    // map to get districts
    const districts = filteredRegion.map((dct) => dct.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure.post('/riders', data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your appication has been submitted',
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div className="py-10">
      <Container className="px-2 lg:px-0">
        <div>
          <h2 className="text-3xl md:text-6xl  text-center md:text-start font-extrabold text-secondary">
            Be A Rider
          </h2>
          <div className="text-info text-sm">
            <div className="hidden">
              <p>
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
                personal
              </p>
              <p> packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className="block md:hidden text-justify mt-5 tracking-wider">
              <p>
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
                personal packages to business shipments — we deliver on time, every time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <form onSubmit={handleSubmit(handleRiderApplication)}>
            <div className="md:flex items-start lg:gap-20  border-t border-black/10">
              <div className="md:w-7/12 ">
                <h2 className="text-2xl text-secondary font-extrabold">Tell us about yourself</h2>

                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Your Name</legend>
                  <input
                    type="text"
                    name="name"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Your Name"
                    {...register('riderName', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Driving License Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Driving License Number"
                    {...register('drivingLicenseNumber', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Your Email</legend>
                  <input
                    type="email"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Your Email"
                    {...register('riderEmail', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset flex gap-4">
                  <div className="w-full md:w-1/2">
                    <legend className="fieldset-legend">Rider Region</legend>
                    <select
                      defaultValue="Select Your Region"
                      className="select appearance-none w-full"
                      {...register('riderRegion', { required: true })}
                    >
                      <option disabled={true}>Select Your Region</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2">
                    <legend className="fieldset-legend">Rider Dristrict</legend>
                    <select
                      defaultValue="Select Your Districts"
                      className="select appearance-none w-full"
                      {...register('riderDistrict', { required: true })}
                    >
                      <option disabled={true}>Select Your Districts</option>
                      {districtsByRegion(riderRegion).map((dristrict, index) => (
                        <option key={index} value={dristrict}>
                          {dristrict}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">NID No</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="NID"
                    {...register('riderNTD', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Phone Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Phone Number"
                    {...register('riderPhoneNumber', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Bike Brand Model and Year</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Bike Brand Model and Year"
                    {...register('bikeBrandModelYear', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Bike Registration Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Bike Registration Number"
                    {...register('bikeRegistrationNumber', { required: true })}
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Tell Us About Yourself</legend>
                  <textarea
                    rows="8"
                    type="text"
                    className="w-full border-[#CBD5E1] bg-white p-3 rounded-md"
                    placeholder="Tell Us About Yourself"
                  />
                </fieldset>

                <button className="btn btn-primary mt-4 text-black w-full">Apply as a Rider</button>
              </div>
              <div className="hidden lg:block ">
                <img src={riderImg} alt="" />
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Rider;
