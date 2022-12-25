import { useTranslate } from '@tolgee/react';
import LanguageSelector from 'components/LanguageSelector.tsx/LanguageSelector';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoggedInSelector } from 'store/selectors/appSelectors';
import { isMobileDevice } from 'store/selectors/uiSelectors';
import SearchUsers from '../../modules/users/SearchUsers';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const isMobile = useSelector(isMobileDevice);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const t = useTranslate();

  return (
    <div className='z-[999] sticky top-0 py-6 bg-dark'>
      <div className='container py-4 px-6 bg-primary rounded-3xl'>
        <div className='flex justify-between items-center gap-3'>
          <div className='flex items-center gap-2'>
            <Link to={isLoggedIn ? '/' : '/home'} className='text-xl font-bold hidden sm:block'>
              {t('app.title')}
            </Link>
            <LanguageSelector />
          </div>
          {isLoggedIn && <SearchUsers />}
          <div className='flex items-center gap-2 flex-shrink-0'>
            {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
