import { ChatType } from 'common/types';
import { formatDate } from 'helpers/helpers';
import { userImageUrl } from 'services/api';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { useAppSelector } from 'store/store';
import { getOtherUser } from './ChatListItem';
import MessagesList from './MessagesList';
import NewMessage from './NewMessage';

const ActiveChatPanel = ({ chat }: { chat: ChatType }) => {
  const currentUserId = useAppSelector(getCurrentUserId);

  const user = getOtherUser(chat, currentUserId);

  return (
    <div>
      <div className='flex items-center gap-5 rounded-3xl p-5 bg-primary'>
        <div className='w-16 h-16 rounded-full overflow-hidden'>
          <img className='w-full h-full object-cover' src={userImageUrl(user?._id)} alt='' />
        </div>
        <div>
          <h3 className='text-2xl font-bold'>{user?.fullName}</h3>
          {user?.isActive ? (
            <p className='truncate font-light text-yellow-300'>Active</p>
          ) : (
            <p className='truncate font-light text-gray-400'>Inactive</p>
          )}
        </div>
        <p className='font-bold ml-auto'>{formatDate(new Date(chat.updatedAt))}</p>
      </div>
      <div className='bg-primary rounded-3xl p-5 mt-5'>
        <MessagesList />
        <NewMessage />
      </div>
    </div>
  );
};

export default ActiveChatPanel;
