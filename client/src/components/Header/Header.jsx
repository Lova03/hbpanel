import { NavLink } from 'react-router-dom';
import pfp from '../../images/pfp.png';
import ProfileOptions from '../ProfileOptions/ProfileOptions';

const Header = ({ opened }) => {
  return (
    <header
      className={`relative flex h-12 justify-between items-center pl-2 pr-8 bg-black/10 transition-all duration-100 ${
        opened ? 'ml-8 sm:ml-12 lg:ml-64' : 'ml-8 sm:ml-12'
      }`}>
      <div className='flex space-x-2 items-center'>
        <NavLink to='/' className=''>
          <img src={pfp} alt='' className='h-10' />
        </NavLink>
        <span className='uppercase select-none'>Houmles Bot</span>
      </div>
      <ProfileOptions />
    </header>
  );
};

export default Header;
