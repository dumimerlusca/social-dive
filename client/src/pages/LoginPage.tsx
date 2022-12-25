import { useTranslate } from '@tolgee/react';
import LoginForm from 'components/auth/LoginForm';
import Header from 'components/layout/Header';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const t = useTranslate();

  return (
    <div className='container'>
      <Header />
      <div className='mt-28'>
        <h1 className='text-5xl font-bold mb-6'>{t('page.login.title')}</h1>
        <div className='flex items-center gap-10'>
          <p className='font-bold text-[rgba(255,255,255,0.64)]'>{t('page.login.noAccountYet')}</p>
          <Link className='text-secondary font-bold' to='/register'>
            {t('labels.signUp')}
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
