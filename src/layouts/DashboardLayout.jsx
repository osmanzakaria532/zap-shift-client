/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BsBox, BsBoxes } from 'react-icons/bs';
import { FaHistory, FaUsers } from 'react-icons/fa';
import { GiScooter } from 'react-icons/gi';
import { IoIosArrowDown, IoIosNotificationsOutline } from 'react-icons/io';
import { MdDeliveryDining, MdElectricBike, MdOutlineAssignment } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import UseUserInfo from '../hooks/useUserInfo';
// import useRole from '../hooks/useRole';

const NavItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? 'text-black bg-primary' : 'text-black'
        } is-drawer-close:tooltip is-drawer-close:tooltip-right`
      }
      data-tip={label}
    >
      <Icon className="inline-block" />
      <span className="is-drawer-close:hidden">{label}</span>
    </NavLink>
  );
};

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  // console.log('in the dashboard layout', role);

  const [show, setShow] = useState(false);

  // console.log('in the dashboard', role);
  // console.log(user);

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full justify-between bg-white sticky top-0 z-40">
          {/* Sidebar icon */}
          <ul>
            <li>
              <NavLink to="/dashboard" className="text-black">
                DashBoard
              </NavLink>
            </li>
          </ul>

          <div>
            <UseUserInfo />
          </div>

          {/* Right Side */}
          <div className="px-4 flex items-center gap-3">
            <div className="border w-10 h-10 rounded-full flex items-center justify-center">
              <IoIosNotificationsOutline className="text-3xl" />
            </div>

            <div className="flex items-center gap-2 cursor-pointer " onClick={() => setShow(!show)}>
              <div className="flex items-center gap-2  relative">
                <div className="border w-10 h-10 rounded-full flex items-center justify-center outline-hidden ">
                  {user?.photoURL && (
                    <img
                      src={user?.photoURL || 'https://i.ibb.co.com/cKMpwWDT/images-1.png'}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="relative">
                  {/* <h2>
                    {user?.displayName
                      ? user.displayName.split(' ').slice(0, 2).join(' ') +
                        (user.displayName.split(' ').length > 2 ? ' ...' : '')
                      : 'User Name'}
                  </h2> */}
                  <h2>{user?.displayName ? user?.displayName.slice(0, 14) : 'User Name'}</h2>
                  <p>{role}</p>
                </div>
                {show && (
                  <div className="w-52 absolute top-10 -right-12 mt-3 bg-white px-2 py-2 space-y-1.5 flex flex-col justify-end items-end text-center">
                    <div className="w-full">
                      <Link to="/dashboard/profile" className="py-2 px-3 block bg-gray-400/10">
                        Profile
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
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 relative">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-44">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Our Links hare */}

            {/* Dash */}

            {/* All parcels */}
            {role === 'admin' && (
              <>
                <li>
                  <NavItem to="/dashboard/all-parcels" icon={BsBoxes} label="All Parcels" />
                </li>
              </>
            )}

            <li>
              <NavItem to="/dashboard/my-parcels" icon={BsBox} label="My Parcels" />
            </li>

            {/* Paymeny History */}
            <li>
              <NavItem to="/dashboard/payment-history" icon={FaHistory} label="Payment History" />
            </li>

            {/* admin route only */}
            {role === 'admin' && (
              <>
                <li>
                  <NavItem
                    to="/dashboard/approve-riders"
                    icon={MdElectricBike}
                    label="Approve Riders"
                  />
                </li>
              </>
            )}

            {/* All Riders */}
            {role === 'admin' && (
              <li>
                <NavItem to="/dashboard/all-riders" icon={GiScooter} label="All Riders" />
              </li>
            )}

            {/* Assign Riders */}
            {role === 'admin' && (
              <li>
                <NavItem
                  to="/dashboard/assign-riders"
                  icon={MdOutlineAssignment}
                  label="Assign Riders"
                />
              </li>
            )}

            {role === 'rider' && <></>}

            {/* {role === 'admin' && <></>} */}
            {/* Users  */}
            {role === 'admin' && (
              <li>
                <NavItem to="/dashboard/all-users" icon={FaUsers} label="All Users" />
              </li>
            )}

            {role === 'rider' && (
              <>
                <li>
                  <NavItem
                    to="/dashboard/assigned-delivereis"
                    icon={MdDeliveryDining}
                    label="Assigned Delivereis"
                  />
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </NavLink>
            </li>
          </ul>
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
