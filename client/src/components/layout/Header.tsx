import Tippy from '@tippyjs/react';
import useLogout from 'common/hooks/useLogout';
import HeaderChatIcon from 'modules/chat/HeaderChatIcon';
import HeaderNotificationIcon from 'modules/notifications/HeaderNotificationIcon';
import React from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, isLoggedInSelector } from 'store/selectors/appSelectors';
import { useAppSelector } from 'store/store';

const classes = {
  icon: 'w-6 h-6',
};

const Header = () => {
  const logoutHandler = useLogout();
  const currentUser = useAppSelector(getCurrentUser);

  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <div className='container m-auto py-4 px-6 bg-primary rounded-3xl my-6'>
      <div className='flex justify-between items-center'>
        <Tippy content='Hello'>
          <h1 className='text-xl font-bold'>INSTAGRAM</h1>
        </Tippy>
        <form>
          <input className='bg-transparent text-xl' placeholder='Search..' />
        </form>
        <div className='flex items-center gap-2'>
          {isAuthenticated ? (
            <>
              <Link to='/'>
                <AiFillHome className={classes.icon} />
              </Link>
              <HeaderNotificationIcon iconClassName={classes.icon} />
              <HeaderChatIcon />
              <Link to={`/profile/${currentUser?._id}`}>
                <FaUser className={classes.icon} />
              </Link>
              <button onClick={logoutHandler}>
                <AiOutlineLogout className={classes.icon} />
              </button>
            </>
          ) : (
            <>
              <Link to='/home'>
                <AiFillHome className={classes.icon} />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
