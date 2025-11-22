import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router';

import Container from '../../../components/Container';
import Logo from '../../../components/Logo/Logo';

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link to="#">Services</Link>
      </li>
      <li>
        <Link to="/coverage">Coverage</Link>
      </li>
      <li>
        <Link to="/about-us">About Us</Link>
      </li>
      <li>
        <Link to="#">Pricing</Link>
      </li>
      <li>
        <Link to="#">Be a Rider</Link>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 left-0 z-50">
      {/* sticky top-0 left-0 z-50 */}
      <Container className="navbar px-0">
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
              {links}
            </ul>
          </div>

          <Logo target="/" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-1.5 ">
          <a className="btn rounded-md bg-white">Sign In</a>
          <a className="flex items-center gap-2.5">
            <span className="btn rounded-md bg-primary">Be a rider</span>
            <span className="bg-primary w-10 h-10 rounded-full flex justify-center items-center">
              <MdArrowOutward className="text-xl" />
            </span>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
