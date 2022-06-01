import Tippy from '@tippyjs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { isMobileDevice } from 'store/selectors/uiSelectors';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const isMobile = useSelector(isMobileDevice);

  return (
    <div className='container m-auto py-4 px-6 bg-primary rounded-3xl my-6'>
      <div className='flex justify-between items-center gap-3'>
        <h1 className='text-xl font-bold hidden sm:block'>INSTAGRAM</h1>
        <form className='flex-grow'>
          <input className='bg-transparent text-xl w-full' placeholder='Search..' />
        </form>
        <div className='flex items-center gap-2 flex-shrink-0'>
          {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
        </div>
      </div>
    </div>
  );
};

export default Header;
