import useLogout from 'common/hooks/useLogout';
import HeaderChatIcon from 'modules/chat/HeaderChatIcon';
import HeaderNotificationIcon from 'modules/notifications/HeaderNotificationIcon';
import React from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, isLoggedInSelector } from 'store/selectors/appSelectors';

const classes = {
  icon: 'w-6 h-6',
};

const DesktopNavigation = () => {
  const isAuthenticated = useSelector(isLoggedInSelector);
  const currentUser = useSelector(getCurrentUser);
  const logoutHandler = useLogout();

  return (
    <>
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
    </>
  );
};

export default DesktopNavigation;
