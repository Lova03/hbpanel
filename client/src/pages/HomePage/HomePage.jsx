import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { selectHasUserError, selectIsUserLoading, selectUser } from '../../features/user/userSlice';
import pfp from '../../images/pfp.png';

const HomePage = () => {
  const user = useSelector(selectUser);
  const loggedIn = user?.success;
  const isLoading = useSelector(selectIsUserLoading);
  const hasError = useSelector(selectHasUserError);

  const [pfpLoaded, setPfpLoaded] = useState(false);
  const handleLoad = () => setPfpLoaded(true);

  const handleDiscordLogin = () => {
    window.open('http://localhost:5000/auth/discord', '_self');
  };
  const handleLogout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };

  return (
    <div className='w-screen h-screen grid place-items-center'>
      {/* Login Prompt */}
      <div className='relative w-full max-w-xl flex flex-col select-none rounded-none presm:rounded-lg bg-gradient-to-br from-sky-700 to-cyan-500 px-5 py-3 presm:shadow-lg'>
        {/* Pfp */}
        <div className='flex p-4 justify-center items-center'>
          <img
            onLoad={handleLoad}
            className={`w-28 h-28 presm:w-36 presm:h-36 rounded-lg animate-float-s-8 duration-300 opacity-0${
              pfpLoaded && ' opacity-100'
            }`}
            src={pfp}
            alt=''
          />
        </div>
        {/* Login Options */}
        {!isLoading && !loggedIn && (
          <div className='relative flex flex-col items-center space-y-5 py-4 mt-4'>
            <span className='font-bold drop-shadow-lg text-xl underline-offset-8 underline'>
              Vyber způsob přihlášení
            </span>
            <div onClick={handleDiscordLogin} className='loginopt'>
              <span>Discord</span>
            </div>
          </div>
        )}
        {loggedIn && (
          <div className='flex flex-col space-y-3 py-4 mt-4 items-center'>
            {!user?.isAdmin && (
              <span className='text-red-700'>Nemáš dostatečné oprávnění pro zobrazení panelu</span>
            )}
            {user?.isAdmin && (
              <NavLink to='/panel' end className='loginopt'>
                Panel
              </NavLink>
            )}
            <div onClick={handleLogout} className='loginopt'>
              <span className='underline underline-offset-4 cursor-pointer'>Odhlásit se</span>
            </div>
          </div>
        )}
        {isLoading && !hasError && (
          <div>
            <Loading size={48} width={4} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
