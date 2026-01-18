import riderImg from '../../../src/assets/agent-pending.png';
import Container from '../../Components/Container';

const Rider = () => {
  // const { register, handleSubmit, control, reset } = useForm();
  // // get user data from auth context
  // const { user } = useAuth();

  // // get secure axios instance
  // const axiosSecure = useAxiosSecure();

  // // get service centers data from loader
  // const serviceCenters = useLoaderData();
  // const regionsDuplicate = serviceCenters.map((center) => center.region);
  // // get unique regions
  // const regions = [...new Set(regionsDuplicate)];

  // // watch senderRegion and receiverRegion fields
  // const riderRegion = useWatch({ control, name: 'riderRegion' });

  // // function to get districts by region
  // const districtsByRegion = (region) => {
  //   // filter service centers by region
  //   const filteredRegion = serviceCenters.filter((center) => center.region === region);
  //   // map to get districts
  //   const districts = filteredRegion.map((dct) => dct.district);
  //   return districts;
  // };

  // const handleRiderApplication = (data) => {
  //   console.log(data);

  //   axiosSecure.post('/riders', data).then((res) => {
  //     if (res.data.insertedId) {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Your appication has been asubmitted',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };

  return (
    <div className="py-10">
      <Container>
        <div>
          <h2 className="text-6xl font-extrabold text-secondary">Be A Rider</h2>
          <p className="text-info">
            <div>
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal
            </div>
            <div> packages to business shipments — we deliver on time, every time.</div>
          </p>
        </div>

        <div className="mt-12">
          <form>
            <div className="flex items-start gap-20  border-t border-black/10">
              <div className="w-7/12 ">
                <h2 className="text-2xl text-secondary font-extrabold">Tell us about yourself</h2>

                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Your Name</legend>
                  <input
                    type="text"
                    name="name"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Driving License Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Driving License Number"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Your Email</legend>
                  <input
                    type="email"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Your Email"
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <div>
                    <legend className="fieldset-legend">Rider Region</legend>
                    <select
                      defaultValue="Select Your Region"
                      className="select appearance-none  w-full"
                    >
                      <option disabled={true}>Select Your Region</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <legend className="fieldset-legend">Rider Dristrict</legend>
                    <select
                      defaultValue="Select Your Districts"
                      className="select appearance-none  w-full"
                    >
                      <option disabled={true}>Select Your Districts</option>
                    </select>
                  </div>
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">NID No</legend>
                  <input type="text" className="input w-full border-[#CBD5E1]" placeholder="NID" />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Phone Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Phone Number"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Bike Brand Model and Year</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Bike Brand Model and Year"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Bike Registration Number</legend>
                  <input
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Bike Registration Number"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Tell Us About Yourself</legend>
                  <textarea
                    type="text"
                    className="input w-full border-[#CBD5E1]"
                    placeholder="Tell Us About Yourself"
                  />
                </fieldset>

                <button className="btn btn-primary mt-4 text-black w-full">Submit</button>
              </div>
              <div className="">
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
