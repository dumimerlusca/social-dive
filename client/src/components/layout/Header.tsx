import React from 'react';
import { useSelector } from 'react-redux';
import { isMobileDevice } from 'store/selectors/uiSelectors';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import SearchUsers from '../../modules/users/SearchUsers';
import { isLoggedInSelector } from 'store/selectors/appSelectors';
import { Link } from 'react-router-dom';

const Header = () => {
  const isMobile = useSelector(isMobileDevice);
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <div className='z-[999] sticky top-0 py-6 bg-dark'>
      <div className='container py-4 px-6 bg-primary rounded-3xl'>
        <div className='flex justify-between items-center gap-3'>
          <Link to='/' className='text-xl font-bold hidden sm:block'>
            SocialDive
          </Link>
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
