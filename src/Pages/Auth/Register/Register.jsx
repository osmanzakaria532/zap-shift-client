import axios from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const districtsByRegion = (region) => {
    // filter service centers by region
    const filteredRegion = serviceCenters.filter((center) => center.region === region);
    // map to get districts
    const districts = filteredRegion.map((dct) => dct.district);
    return districts;
  };
  const userRegion = useWatch({ control, name: 'userRegion' });

  // console.log('register page', { location, navigate });

  const handleRegistration = (data) => {
    console.log('Registration From Data', data);

    // get photo to store in imgaeBB
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // store image and get url
        const formData = new FormData();
        formData.append('image', profileImg);

        //post photo in imageBB via axios
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_api_key
        }`;
        axios.post(image_api_url, formData).then((res) => {
          console.log('after image upload', res.data.data.url);

          // update profile
          const updateProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(updateProfile)
            .then(() => {
              console.log('user profile updated done');
              navigate('/');
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="pt-16 pb-10 px-2 lg:px-0 md:flex flex-col justify-center items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-[22px] md:text-[30px] lg:text-[42px] font-extrabold">
          Create an Account
        </h2>
        <p className="text-sm md:text-base">Register with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleRegistration)} className="w-full max-w-sm">
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Your Name is</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </fieldset>
        <fieldset className="fieldset flex flex-col md:flex-row">
          {/* Resion And District */}
          <div className="w-full md:w-1/2">
            <legend className="fieldset-legend">Your Region is</legend>
            <select
              defaultValue="Select Your Region"
              className="select appearance-none  w-full"
              {...register('userRegion')}
            >
              <option>Select Your Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <legend className="fieldset-legend">Your Dristrict is</legend>
            <select
              defaultValue="Select Your Districts"
              className="select appearance-none  w-full"
              {...register('userDistrict')}
            >
              <option>Select Your Districts</option>
              {districtsByRegion(userRegion).map((dristrict, index) => (
                <option key={index} value={dristrict}>
                  {dristrict}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          {/* Photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            className="file-input w-full"
            placeholder="Add Your Photo "
            {...register('photo', { required: true })}
          />
          {errors.photo && <p className="text-red-500 text-sm mt-1">Photo is Required</p>}
        </fieldset>

        <fieldset className="fieldset">
          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 12,
                message: 'Password cannot exceed 12 characters',
              },
              // pattern: {
              //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
              //   message: 'Password must contain at least one letter and one number',
              // },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </fieldset>

        <button className="btn w-full bg-primary mt-4">Register</button>
        <p className="mt-2 text-sm md:text-base">
          Already have an account?{' '}
          <Link to="/sign-in" state={location.state} className="link link-hover text-[#8FA748] ">
            Sign In
          </Link>
        </p>
        <p className="text-center my-2">Or</p>
        <SocialLogin />
      </form>
    </div>
  );
};

export default Register;
