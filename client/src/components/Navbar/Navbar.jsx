import { useEffect, useState } from 'react';
import NavItem from '../NavItem/NavItem';

import { Bars3Icon, NewspaperIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Navbar = ({ opened, setOpened }) => {
  const [overflow, setOverflow] = useState(null);
  useEffect(() => {
    const isOverflown = ({ scrollHeight, clientHeight }) => scrollHeight > clientHeight;
    const nav = document.querySelector('nav');
    setOverflow(isOverflown(nav));
    const res = () => {
      const el = nav;
      setOverflow(isOverflown(el));
    };
    window.addEventListener('resize', res);
    return () => {
      window.removeEventListener('resize', res);
    };
  }, []);

  return (
    <div className='absolute flex z-30 isolate'>
      <nav
        className={`relative overflow-y-auto overflow-x-hidden shadow-2xl lg:shadow-none bg-zinc-800 h-screen transition-all duration-100 select-none ${
          opened ? 'w-52 sm:w-64' : overflow ? 'w-10 sm:w-14' : 'w-8 sm:w-12'
        }
      }`}>
        <div className='navitem justify-end bg-sky-400/80'>
          <div
            onClick={() => setOpened((prev) => !prev)}
            className='cursor-pointer mr-[4px] sm:mr-[2px]'>
            <Bars3Icon className='h-6 sm:h-11 sm:p-2 text-slate-100' />
          </div>
        </div>
        <NavItem opened={opened} setOpened={setOpened} text='Panel' to='/panel' Icon={Cog6ToothIcon} />
        <NavItem opened={opened} setOpened={setOpened} text='Logs' to='/logs' Icon={NewspaperIcon} />
      </nav>
      {opened && (
        <div
          onClick={() => setOpened(false)}
          className='absolute -z-10 bg-black/40 w-screen h-full lg:hidden'></div>
      )}
    </div>
  );
};

export default Navbar;
