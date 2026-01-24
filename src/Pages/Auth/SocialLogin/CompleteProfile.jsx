import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CompleteProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const email = location.state?.email;
  const serviceCenters = useLoaderData();

  const userRegion = useWatch({ control, name: 'userRegion' });

  // Unique regions from serviceCenters
  const regions = [...new Set(serviceCenters.map((center) => center.region))];

  // Get districts by selected region
  const districtsByRegion = (region) => {
    if (!region) return [];
    const filteredCenters = serviceCenters.filter((center) => center.region === region);
    return filteredCenters.map((center) => center.district);
  };

  // Form submission
  const handleNewUserSubmition = (data) => {
    axiosSecure
      .patch(`/users/${email}`, { region: data.userRegion, district: data.userDistrict })
      .then(() => {
        toast.success('Profile completed successfully');
        navigate('/'); // redirect to home/dashboard
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(handleNewUserSubmition)}>
      <div className="w-75 mx-auto space-y-4 mt-10">
        {/* Region Select */}
        <div>
          <select
            {...register('userRegion', { required: true })}
            className="select input w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select Your Region
            </option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.userRegion && <p className="text-red-500 text-sm mt-1">Region is required</p>}
        </div>

        {/* District Select */}
        <div>
          <select
            {...register('userDistrict', { required: true })}
            className="select input w-full"
            defaultValue=""
            disabled={!userRegion} // disable until a region is selected
          >
            <option value="" disabled>
              Select Your District
            </option>
            {districtsByRegion(userRegion).map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.userDistrict && <p className="text-red-500 text-sm mt-1">District is required</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-accent text-white w-full">
          Complete Profile
        </button>
      </div>
    </form>
  );
};

export default CompleteProfile;
