/* eslint-disable no-unused-vars */
import { BsBox, BsBoxes } from 'react-icons/bs';
import { FaHistory, FaUsers } from 'react-icons/fa';
import { GiScooter } from 'react-icons/gi';
import { IoIosArrowDown, IoIosNotificationsOutline } from 'react-icons/io';
import { MdDeliveryDining, MdElectricBike, MdOutlineAssignment } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
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
  const { user } = useAuth();
  // const { role } = useRole();

  // console.log('in the dashboard', role);
  // console.log(user);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full justify-between bg-white sticky top-0 z-50">
          {/* Sidebar icon */}
          <ul>
            <li>
              <NavLink to="/dashboard" className="text-black">
                DashBoard
              </NavLink>
            </li>
          </ul>

          <p>
            {user?.email} : <span className="capitalize"></span>
          </p>

          {/* Right Side */}
          <div className="px-4 flex items-center gap-3">
            <div className="border w-10 h-10 rounded-full flex items-center justify-center">
              <IoIosNotificationsOutline className="text-3xl" />
            </div>
            <div className="border w-10 h-10 rounded-full flex items-center justify-center outline-hidden">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
            <div>
              {/* <h2>
                {user?.displayName
                  ? user.displayName.split(' ').slice(0, 2).join(' ') +
                    (user.displayName.split(' ').length > 2 ? ' ...' : '')
                  : 'User Name'}
              </h2> */}
              <h2>{user?.displayName ? user?.displayName.slice(0, 14) : 'User Name'}</h2>
              <h6></h6>
            </div>
            <div>
              <IoIosArrowDown />
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 relative">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
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
            {/* {role === 'admin' && <></>} */}

            <li>
              <NavItem to="/dashboard/all-parcels" icon={BsBoxes} label="All Parcels" />
            </li>
            <li>
              <NavItem to="/dashboard/my-parcels" icon={BsBox} label="My Parcels" />
            </li>

            {/* Paymeny History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Payment History"
              >
                <FaHistory className="inline-block" />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {/* admin route only */}
            {/* {role === 'admin' && <></>} */}
            {/* Approve Riders */}
            <li>
              <NavLink
                to="/dashboard/approve-riders"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Approve Riders"
              >
                <MdElectricBike className="inline-block" />
                <span className="is-drawer-close:hidden">Approve Riders</span>
              </NavLink>
            </li>

            {/* All Riders */}
            <li>
              <NavLink
                to="/dashboard/all-riders"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="All Riders"
              >
                <GiScooter className="inline-block" />
                <span className="is-drawer-close:hidden">All Riders</span>
              </NavLink>
            </li>

            {/* Assign Riders */}
            <li>
              <NavLink
                to="/dashboard/assign-riders"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Assign Riders"
              >
                <MdOutlineAssignment className="inline-block" />
                <span className="is-drawer-close:hidden">Assign Riders</span>
              </NavLink>
            </li>

            {/* {role === 'rider' && <></>} */}
            <li>
              <NavLink
                to="/dashboard/assigned-delivereis"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Assigned Delivereis"
              >
                <MdDeliveryDining className="inline-block" />
                <span className="is-drawer-close:hidden">Assigned Delivereis</span>
              </NavLink>
            </li>

            {/* {role === 'admin' && <></>} */}
            {/* Users  */}
            <li>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-black bg-primary' : 'text-black'
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Users "
              >
                <FaUsers className="inline-block" />
                <span className="is-drawer-close:hidden">Users</span>
              </NavLink>
            </li>

            {/* Rider Route */}
            {/* {role === 'rider' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-delivereis"
                    className={({ isActive }) =>
                      `${
                        isActive ? 'text-black bg-primary' : 'text-black'
                      } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                    }
                    data-tip="Assigned Delivereis"
                  >
                    <MdDeliveryDining className="inline-block" />
                    <span className="is-drawer-close:hidden">Assigned Delivereis</span>
                  </NavLink>
                </li>
              </>
            )} */}

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
