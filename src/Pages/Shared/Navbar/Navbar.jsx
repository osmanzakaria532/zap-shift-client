import { MdArrowOutward } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import Container from '../../../Components/Container';
import Logo from '../../../Components/Logo/Logo';

const Navbar = () => {
  const menuItems = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink>Coverage</NavLink>
      </li>
      <li>
        <NavLink>About Us</NavLink>
      </li>
      <li>
        <NavLink>Pricing</NavLink>
      </li>
      <li>
        <NavLink>Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <Container className="px-2 md:px-0">
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
            <Link to="/sign-in" className="flex">
              <span className="border border-[#DADADA] bg-[#caeb66] rounded-lg px-2 md:px-4 py-1 md:py-1.5 text-sm md:text-base">
                Sign in
              </span>
              <span className="rounded-full w-10 h-10 bg-[#03464D] md:flex items-center justify-center ms-1 hidden">
                <MdArrowOutward className=" text-[#caeb66] text-2xl" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
