import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import { Link } from 'react-router';

import Container from '../../../components/Container';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {
  return (
    <>
      <footer className="text-primary-content py-10">
        <Container className="footer footer-horizontal footer-center bg-[#0B0B0B] py-20 rounded-lg">
          <aside>
            <Logo target="/" />
            <div className="font-bold mt-5 space-y-1.5">
              <p>
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
                personal packages to
              </p>
              <p>business shipments — we deliver on time, every time.</p>
            </div>
            {/* <p>Copyright © {new Date().getFullYear()} - All right reserved</p> */}
          </aside>
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link to="#">Services</Link>
              </li>
              <li>
                <Link to="#">Coverage</Link>
              </li>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Pricing</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
            <div className="grid grid-flow-col gap-4 mt-10">
              {/* LinkedIn */}
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                <FaLinkedin className="text-[#0A66C2] text-2xl" />
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                <FaTwitter className="text-[#1DA1F2] text-2xl" />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                <FaFacebookF className="text-[#1877F2] text-2xl" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                <FaYoutube className="text-[#FF0000] text-2xl" />
              </a>
            </div>
          </nav>
        </Container>
      </footer>
    </>
  );
};
export default Footer;
