import { useForm } from 'react-hook-form';
// import { FaArrowUp, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    console.log(data);
    console.log('Photo:', data.photo[0]);
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
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
          console.log('after upload image', res.data.data);

          // update user profile with name and photo url
          const updateProfile = {
            displayName: data.name,
            photoURL: res.data.data.display_url,
          };
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
          <label className="label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-red-500">Name is required</span>
          )}
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
