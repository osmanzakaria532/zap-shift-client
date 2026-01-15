import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import Container from '../../../Components/Container';
import Logo from '../../../Components/Logo/Logo';

const Footer = () => {
  return (
    <div>
      <Container>
        <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] md:rounded-4xl p-10">
          <aside className="w-auto lg:w-full">
            <Logo />
            <p className="text-[#DADADA]">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal packages
            </p>
            <p className="text-[#DADADA]">
              to business shipments — we deliver on time, every time.
            </p>
          </aside>
          <nav className="border-dashed border-b border-t border-[#03464D] py-4 w-full">
            <ul className="flex lg:flex-row flex-wrap justify-center items-center gap-6 text-[#DADADA]">
              <li>
                <Link>Services</Link>
              </li>
              <li>
                <Link>Coverage</Link>
              </li>
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Pricing</Link>
              </li>
              <li>
                <Link>Blogs</Link>
              </li>
              <li>
                <Link>Contact us</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-6">
            <div className="bg-[#2489BE] w-8 h-8 rounded-full flex items-center justify-center">
              <FaLinkedinIn className="text-lg" />
            </div>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <FaXTwitter className="text-lg" />
            </div>
            <div className="bg-[#006AFF] w-8 h-8 rounded-full flex items-center justify-center">
              <FaFacebookF className="text-lg" />
            </div>
            <div className="bg-[#FF0000] w-8 h-8 rounded-full flex items-center justify-center">
              <FaYoutube className="text-lg text-white" />
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
