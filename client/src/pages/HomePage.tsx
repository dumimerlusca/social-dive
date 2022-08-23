import useLoginToDemoAccount from 'components/auth/useLoginToDemoAccount';
import Button from 'components/Button/Button';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

type TechStackitemType = {
  imageName: string;
  text: string;
};

const techstackItems: TechStackitemType[] = [
  {
    imageName: 'react.png',
    text: 'React JS',
  },
  {
    imageName: 'nestJS.png',
    text: 'Nest JS',
  },
  {
    imageName: 'tailwind.png',
    text: 'Tailwind CSS',
  },
  {
    imageName: 'mongoICON.png',
    text: 'MongoDB',
  },
  {
    imageName: 'socketIO.png',
    text: 'Socket.io',
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { loginToDemoAccount, isLoading, isLoggedIn, error } = useLoginToDemoAccount();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='relative h-auto lg:h-screen min-h-[800px] overflow-hidden'>
      <div
        style={{ backdropFilter: 'blur(5px)' }}
        className='bg-white/[0.02] absolute w-[140vw] top-0 left-0 z-[1] rounded-full aspect-square -translate-x-1/2 pointer-events-none -translate-y-1/2'
      ></div>
      <div className='container'>
        <div className='mt-[150px] flex flex-col lg:flex-row justify-between gap-10'>
          <div className='z-[1]'>
            <h1 className='text-[64px] font-semibold leading-[70px]'>Social Dive</h1>
            <h4 className='text-[24px] font-light'>Social media platform</h4>
            <div className='flex flex-col'>
              <button
                className='mt-10 px-10 py-3 text-[24px] uppercase bg-tertiary rounded-lg font-bold hover:opacity-75 transition-opacity'
                onClick={loginToDemoAccount}
              >
                {isLoading ? 'Loading...' : 'try it using a demo account'}
              </button>
              {error && <p className='text-center mt-2 text-red-600'>Something went wrong</p>}
              <p className='text-center font-bold text-md my-3'>OR</p>
              <div className='flex gap-5 items-center justify-center'>
                <Button
                  className='rounded-lg'
                  color='secondary'
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </Button>
                <Button
                  className='rounded-lg'
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className='mt-10 space-y-3'>
              {techstackItems.map((item, index) => (
                <TechStackItem key={index} item={item} />
              ))}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-1 mt-20'>
            <img
              src='/profilePage.png'
              className='max-w-[226px] rounded-2xl -translate-y-16 translate-x-20 hover:z-[10]'
              alt=''
              style={{ boxShadow: '7px -7px #FF4848' }}
            />
            <img
              src='/newsfeed.png'
              className='max-w-[310px] rounded-2xl hover:z-[10] invisible md:visible'
              alt=''
              style={{ boxShadow: '7px -7px #FF4848' }}
            />
            <img
              src='/chat.png'
              className='max-w-[223px] rounded-2xl -translate-y-36 hover:z-[10]'
              alt=''
              style={{ boxShadow: '7px -7px #FF4848' }}
            />
            <img
              src='/singlePost.png'
              className='max-w-[226px] rounded-2xl -translate-y-7 -translate-x-20 hover:z-[10]'
              alt=''
              style={{ boxShadow: '7px -7px #FF4848' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const TechStackItem = ({ item: { imageName, text } }: { item: TechStackitemType }) => {
  return (
    <div className='flex items-center gap-3'>
      <img className='w-10 h-10' src={`/techstack/${imageName}`} alt='' />
      <p className='text-xl font-medium'>{text}</p>
    </div>
  );
};
