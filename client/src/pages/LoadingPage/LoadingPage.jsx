import React from 'react';
import Loading from '../../components/Loading/Loading';

const LoadingPage = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <Loading size={64} width={4} />
    </div>
  );
};

export default LoadingPage;
