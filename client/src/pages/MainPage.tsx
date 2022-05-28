import NotificationsPanel from 'modules/notifications/NotificationsPanel';
import React from 'react';
import PeopleYouMightKnow from 'modules/users/PeopleYouMightKnow/PeopleYouMightKnow';
import Newsfeed from '../modules/posts/Newsfeed/Newsfeed';
import Friends from '../modules/users/Friends/Friends';

const MainPage = () => {
  return (
    <div className='container'>
      <main className='grid grid-cols-12 gap-7'>
        <div className='col-span-3'>
          <Friends />
          <PeopleYouMightKnow />
        </div>
        <Newsfeed wrapperClassName='col-span-6' />
        <NotificationsPanel wrapperClassName='col-span-3' />
      </main>
    </div>
  );
};

export default MainPage;
