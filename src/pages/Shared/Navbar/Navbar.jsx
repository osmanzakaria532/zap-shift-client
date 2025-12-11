import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';

import { toast } from 'react-toastify';
import Container from '../../../components/Container';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  // state to handle navbar size on scroll
  const [isSmall, setIsSmall] = useState(false);
  // get user from auth context
  const { user, logOut } = useAuth();

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('User logged out successfully');
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Pricing
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Send Parcel
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/my-parcels"
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              My Parcels
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/rider"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          Be a Rider
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`bg-base-100 shadow-sm sticky top-0 left-0 z-50! transition-all duration-300 ${
        isSmall ? 'py-1' : 'py-2'
      }`}
    >
      <Container className="navbar px-0 transition-all duration-300">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost lg:hidden transition-all duration-300 ${
                isSmall ? 'px-2 py-1' : 'px-3 py-2'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isSmall ? 'h-4 w-4' : 'h-5 w-5'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Logo target="/" className={`transition-all duration-300 ${isSmall ? 'w-20' : 'w-32'}`} />
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`ul-style menu menu-horizontal px-1 transition-all duration-300 ${
              isSmall ? 'text-sm gap-1' : 'text-base gap-2'
            }`}
          >
            {links}
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="navbar-end space-x-1.5 transition-all duration-300">
          {user ? (
            <button
              onClick={handleLogOut}
              className={`btn rounded-md bg-white transition-all duration-300 ${
                isSmall ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-base'
              }`}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className={`btn rounded-md bg-white transition-all duration-300 ${
                isSmall ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-base'
              }`}
            >
              Log In
            </Link>
          )}

          {/* <a className="flex items-center gap-2">
            <span
              className={`btn rounded-md bg-primary transition-all duration-300 ${
                isSmall ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-base'
              }`}
            >
              Be a rider
            </span>

            <span
              className={`bg-primary rounded-full flex justify-center items-center transition-all duration-300 ${
                isSmall ? 'w-8 h-8' : 'w-10 h-10'
              }`}
            >
              <MdArrowOutward
                className={`transition-all duration-300 ${isSmall ? 'text-lg' : 'text-xl'}`}
              />
            </span>
          </a> */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
