import NotificationsPanel from 'modules/notifications/NotificationsPanel';
import React from 'react';
import PeopleYouMightKnow from 'modules/users/PeopleYouMightKnow/PeopleYouMightKnow';
import Newsfeed from '../modules/posts/Newsfeed/Newsfeed';
import Friends from '../modules/users/Friends/Friends';
import { useAppSelector } from 'store/store';
import { isDesktopDevice, isMobileDevice, isTabletDevice } from 'store/selectors/uiSelectors';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { HEADER_HEIGHT } from 'common/constansts';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import AllFriendsModal from 'modules/users/Friends/AllFriendsModal';

const MainPage = () => {
  const isDesktop = useAppSelector(isDesktopDevice);
  const isTablet = useSelector(isTabletDevice);
  const isMobile = useSelector(isMobileDevice);

  const currentUserId = useSelector(getCurrentUserId);

  return (
    <>
      <AllFriendsModal userId={currentUserId} />
      <div className='container'>
        <main className='grid grid-cols-12 gap-7'>
          <div
            className={classNames({
              'col-span-3': isDesktop,
              'col-span-4': isTablet,
              hidden: isMobile,
            })}
          >
            <div
              className='sticky flex flex-col gap-7'
              style={{
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                top: `${HEADER_HEIGHT}px`,
              }}
            >
              <div className='flex-1 overflow-hidden'>
                <Friends />
              </div>
              <div className='flex-1 overflow-hidden'>
                <PeopleYouMightKnow />
              </div>
            </div>
          </div>
          <Newsfeed
            wrapperClassName={classNames({
              'col-span-6': isDesktop,
              'col-span-8': isTablet,
              '!col-span-12': isMobile,
            })}
          />
          {isDesktop && (
            <div className='col-span-3 '>
              <NotificationsPanel
                style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`, top: `${HEADER_HEIGHT}px` }}
                wrapperClassName='sticky'
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MainPage;
