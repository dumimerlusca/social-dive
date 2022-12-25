import DnaAnimation from 'components/loadingSpinners/DnaAnimation/DnaAnimation';

const LoadUserLoadingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen overflow-hidden'>
      <div className='relative h-[150px] md:h-[300px]'>
        <DnaAnimation className='scale-50 md:scale-100' />
      </div>
    </div>
  );
};

export default LoadUserLoadingScreen;
