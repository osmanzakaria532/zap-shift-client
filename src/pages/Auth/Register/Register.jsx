/* eslint-disable no-unused-vars */
import { useForm, useWatch } from 'react-hook-form';
// import { FaArrowUp, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  // dynamic Region And districts
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  // get unique regions
  const regions = [...new Set(regionsDuplicate)];

  // watch senderRegion and receiverRegion fields
  const region = useWatch({ control, name: 'region' });

  // function to get districts by region
  const districtsByRegion = (region) => {
    // filter service centers by region
    const filteredRegion = serviceCenters.filter((center) => center.region === region);
    // map to get districts
    const districts = filteredRegion.map((dct) => dct.district);
    return districts;
  };

  const handleRegistration = (data) => {
    // console.log(data);
    // console.log('Photo:', data.photo[0]);
    const profileImage = data.photo[0];
    console.log(profileImage);

    registerUser(data.email, data.password)
      .then((result) => {
        // const user = result.user;
        // console.log(user);
        // store photo ang get photo
        //
        const formData = new FormData();
        //
        formData.append('image', profileImage);

        // upload image to imgbb

        // url = 'https://api.imgbb.com/1/upload?key=' + import.meta.env.VITE_IMAGE_HOSTING;
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING
        }`;
        axios.post(image_api_url, formData).then((res) => {
          // console.log('after upload image', res.data.data);
          const PhotoURL = res.data.data.url;
          console.log(PhotoURL);

          // create use in db

          // update user profile with name and photo url
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: PhotoURL,
            region: data.region,
            district: data.district,
          };

          axiosSecure.post('/users', userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('user created in the database');
            }
          });

          const updateProfile = {
            displayName: data.name,
            photoURL: PhotoURL,
          };
          console.log(updateProfile);

          updateUserProfile(updateProfile)
            .then(() => {
              console.log('User profile updated');
              navigate(location?.state || '/');
            })
            .catch((error) => {
              console.log('Error updating user profile:', error);
            });
        });

        toast.success('Registration successful');
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="">
        <h2 className="text-[42px] font-extrabold">Create an Account</h2>
        <p>Register with ZapShift</p>
        {/* <div className="bg-[#F5F5F5] w-10 h-10 rounded-full relative flex justify-center items-center my-4 overflow-hidden">
          <FaUser />
          <span className="inline-block absolute bg-primary text-white rounded-full p-0.5 bottom-0.5 right-0.5 border-2 border-white">
            <FaArrowUp className="text-xs" />
          </span>
        </div> */}
      </div>
      <form onSubmit={handleSubmit(handleRegistration)} className="w-[385px]">
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Your Name is</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-red-500">Name is required</span>
          )}
        </fieldset>
        <fieldset className="fieldset flex">
          {/* Resion And District */}
          <div className="w-1/2">
            <legend className="fieldset-legend">Your Region is</legend>
            <select
              defaultValue="Select Your Region"
              className="select appearance-none  w-full"
              {...register('region')}
            >
              <option disabled={true}>Select Your Region</option>
              {regions.map((region, index) => (
                <option value={region} key={index}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <legend className="fieldset-legend">Your Dristrict is</legend>
            <select
              defaultValue="Select Your Districts"
              className="select appearance-none  w-full"
              {...register('district')}
              disabled={!region}
            >
              <option disabled={true}>Select Your Districts</option>
              {districtsByRegion(region)?.map((district, index) => (
                <option value={district} key={index}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="fieldset">
          {/* /email field */}
          <label className="label">Photo</label>
          <input
            type="file"
            className="file-input w-full"
            placeholder="Add Your Photo "
            {...register('photo', { required: true })}
          />
          {errors.photo?.type === 'required' && (
            <span className="text-red-500">Photo is required</span>
          )}

          {/* /email field */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && (
            <span className="text-red-500">Email is required</span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="text-red-500">Password must be at least 6 characters</span>
          )}
          <button className="btn bg-primary mt-4">Register</button>
        </fieldset>
        <p className="mt-2">
          Already have an account?{' '}
          <Link to="/login" className="link link-hover text-primary" state={location.state}>
            Login
          </Link>
        </p>
        <p className="text-center my-2">Or</p>
        <SocialLogin />
      </form>
    </div>
  );
};

export default Register;
