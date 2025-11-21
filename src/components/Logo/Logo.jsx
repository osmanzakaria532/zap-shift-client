import { Link } from 'react-router';
import logo from '../../../src/assets/logo.png';

const Logo = ({ target = '' }) => {
  return (
    <Link to={`${target}`}>
      <img src={logo} alt="" />
    </Link>
  );
};

export default Logo;
