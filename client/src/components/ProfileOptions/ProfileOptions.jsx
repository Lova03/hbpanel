import { useRef, useState, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const ProfileOptions = () => {
  const user = useSelector(selectUser);

  const [opened, setOpened] = useState(false);
  const profilebox = useRef(null);

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  const handleLogout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };

  useEffect(() => {
    const check = ({ target }) => {
      if (!opened) return;
      if (profilebox.current.contains(target)) return;
      setOpened(false);
    };
    window.addEventListener('click', check);
    return () => {
      window.removeEventListener('click', check);
    };
  }, [opened]);

  return (
    <div ref={profilebox} className='relative'>
      <div
        onClick={handleClick}
        className={`relative flex items-center justify-center group cursor-pointer ${
          opened && 'text-sky-700'
        }`}>
        <UserCircleIcon className='h-9 rounded-full group-hover:text-sky-700' />
      </div>
      <div
        className={`absolute ${
          opened ? 'flex' : 'hidden'
        } top-[117%] w-64 p-3 -right-8 sm:right-0 bg-cyan-600 flex-col shadow-2xl rounded-md z-10 isolate`}>
        <div className='flex items-center justify-center font-bold break-all mx-2 mb-1 h-12 border-b-cyan-300 border-b-[1px]'>
          <span>{user.userid}</span>
        </div>
        <div onClick={handleLogout} className='userpanelitem'>
          <ArrowRightOnRectangleIcon className='h-4' />
          <span>Odhlásit se</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
