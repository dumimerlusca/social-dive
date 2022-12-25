import { useTranslate } from '@tolgee/react';
import useLoginToDemoAccount from 'components/auth/useLoginToDemoAccount';
import Button from 'components/Button/Button';
import LanguageSelector from 'components/LanguageSelector.tsx/LanguageSelector';
import DnaAnimation from 'components/loadingSpinners/DnaAnimation/DnaAnimation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './HomePage.scss';

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
  const t = useTranslate();
  const { loginToDemoAccount, isLoading, isLoggedIn, error } = useLoginToDemoAccount();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='relative h-auto lg:h-screen min-h-[800px] overflow-hidden'>
      <LanguageSelector className='fixed top-4 right-4 z-10' />
      <div
        style={{ backdropFilter: 'blur(5px)' }}
        className='backdrop-blur bg-white/[0.02] absolute w-[140vw] top-0 left-0 z-[1] rounded-full aspect-square -translate-x-1/2 pointer-events-none -translate-y-1/2'
      ></div>
      <div className='container'>
        <div className='mt-[150px] flex flex-col lg:flex-row justify-between gap-10'>
          <div className='z-[1]'>
            <h1
              className='text-[64px] font-semibold leading-[70px] fadeIn'
              style={{ animationDelay: '.4s' }}
            >
              {t('app.title')}
            </h1>
            <h4 className='text-[24px] font-light fadeIn' style={{ animationDelay: '.3s' }}>
              {t('homePage.subtitle')}
            </h4>
            <div className='flex flex-col'>
              <button
                className='fadeIn w-screen max-w-lg min-h-[57px] flex items-center justify-center mt-10 px-10 py-3 text-[24px] uppercase bg-tertiary rounded-lg font-bold hover:opacity-75 transition-opacity'
                style={{ animationDelay: '.2s' }}
                onClick={loginToDemoAccount}
              >
                {isLoading ? (
                  <DnaAnimation className='scale-[0.2]' />
                ) : (
                  <p>{t('login.withDemoAccount')}</p>
                )}
              </button>
              {error && (
                <p className='text-center mt-2 text-red-600'>{t('notification.generalError')}</p>
              )}
              <p
                className='fadeIn text-center font-bold text-md my-3'
                style={{ animationDelay: '.1s' }}
              >
                {t('generalText.or')}
              </p>
              <div className='fadeIn flex gap-5 items-center justify-center'>
                <Button
                  className='rounded-lg'
                  color='secondary'
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  {t('labels.logIn')}
                </Button>
                <Button
                  className='rounded-lg'
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  {t('labels.signUp')}
                </Button>
              </div>
            </div>
            <div className='mt-10 space-y-3'>
              {techstackItems.map((item, index) => (
                <TechStackItem key={index} index={index} item={item} />
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

const TechStackItem = ({
  item: { imageName, text },
  index,
}: {
  item: TechStackitemType;
  index: number;
}) => {
  const animationDelay = index / 10;

  return (
    <div
      className='fadeIn flex items-center gap-3'
      style={{ animationDelay: `-${animationDelay}s` }}
    >
      <img className='w-10 h-10' src={`/techstack/${imageName}`} alt='' />
      <p className='text-xl font-medium'>{text}</p>
    </div>
  );
};
