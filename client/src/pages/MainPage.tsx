import NotificationsPanel from 'modules/notifications/NotificationsPanel';
import React from 'react';
import PeopleYouMightKnow from 'modules/users/PeopleYouMightKnow/PeopleYouMightKnow';
import Newsfeed from '../modules/posts/Newsfeed/Newsfeed';
import Friends from '../modules/users/Friends/Friends';
import { useAppSelector } from 'store/store';
import { isDesktopDevice, isMobileDevice, isTabletDevice } from 'store/selectors/uiSelectors';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const MainPage = () => {
  const isDesktop = useAppSelector(isDesktopDevice);
  const isTablet = useSelector(isTabletDevice);
  const isMobile = useSelector(isMobileDevice);

  return (
    <div className='container'>
      <main className='grid grid-cols-12 gap-7'>
        <div
          className={classNames({
            'col-span-3': isDesktop,
            'col-span-4': isTablet,
            hidden: isMobile,
          })}
        >
          <Friends />
          <PeopleYouMightKnow />
        </div>
        <Newsfeed
          wrapperClassName={classNames({
            'col-span-6': isDesktop,
            'col-span-8': isTablet,
            '!col-span-12': isMobile,
          })}
        />
        {isDesktop && <NotificationsPanel wrapperClassName='col-span-3' />}
      </main>
    </div>
  );
};

export default MainPage;
