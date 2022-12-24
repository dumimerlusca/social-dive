import DnaAnimation from 'components/loadingSpinners/DnaAnimation/DnaAnimation';
import React from 'react';

const LoadUserLoadingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen overflow-hidden'>
      <h1 className='text-3xl font-bold'>Logging...</h1>
      <div className='relative h-[150px] md:h-[300px]'>
        <DnaAnimation className='scale-50 md:scale-100' />
      </div>
    </div>
  );
};

export default LoadUserLoadingScreen;
