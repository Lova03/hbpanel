import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const StorageItem = ({ title, handleSelect, selected }) => {
  const handleClick = () => handleSelect(title);

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: selected ? 'rgb(244,63,94,0.2)' : 'rgba(212,212,216,0.1)',
        width: selected ? 'calc(100% - 2rem)' : '100%',
        marginLeft: selected ? 32 : 0,
      }}
      className='relative flex flex-col justify-center pl-5 col p-1 min-h-[44px] cursor-pointer bg-zinc-300/10 border-b border-solid border-b-zinc-300/20 transition-all duration-200 last:border-b-0 break-all group hover:shadow-[inset_0_0_12px_1px_rgba(239,68,68,0.4)]'>
      {!selected && (
        <div className='absolute -left-8 border border-solid border-red-500 text-red-500 bg-rose-500/20 rounded-sm transition-all duration-200 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:translate-x-5'>
          <XMarkIcon className='h-6' />
        </div>
      )}
      <span className='text-sm'>{title}</span>
    </div>
  );
};

export default StorageItem;
