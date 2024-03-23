import React from 'react';

const Loading = ({ size = 32, width = 4 }) => {
  return (
    <div className='flex justify-center items-center'>
      <div
        style={{ width: size, height: size, borderWidth: width }}
        className='animate-spin rounded-full border-zinc-500/30 border-t-sky-300/80'></div>
    </div>
  );
};

export default Loading;
