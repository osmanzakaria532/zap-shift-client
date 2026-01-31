import { useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import Container from '../../../Components/Container';
import Logo from '../../../Components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const menuItems = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage-area">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/send-a-parcel">Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/be-a-rider">Be a Rider</NavLink>
      </li>
      <li>
        <NavLink to="/parcel-tracking">Track Order</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard/my-parcels">My Parcel</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-9999">
      <Container className="px-2 xl:px-0">
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {' '}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{' '}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {menuItems}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{menuItems}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <div onClick={() => setShow(!show)} className="relative cursor-pointer">
                  <img
                    src={user?.photoURL}
                    alt="Profile photo"
                    className="rounded-full w-10 h-10"
                  />
                  {show && (
                    <div className="w-32 absolute -right-2 mt-3 bg-white px-2 py-2 space-y-1.5 flex flex-col justify-end items-end text-center">
                      <div className="w-full">
                        <Link to="/dashboard" className="py-2 px-3 block bg-gray-400/10 ">
                          Dashboard
                        </Link>
                      </div>
                      <div className="w-full">
                        <button onClick={handleSignOut} className="btn px-3 w-full">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/sign-in" className="flex">
                <span className="border border-[#DADADA] bg-[#caeb66] rounded-lg px-2 md:px-4 py-1.5 text-sm md:text-base">
                  Sign in
                </span>
                <span className="rounded-full w-10 h-10 bg-[#03464D] md:flex items-center justify-center ms-1 hidden">
                  <MdArrowOutward className=" text-[#caeb66] text-2xl" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
