import { modalNames } from 'common/constansts';
import SendMessageButton from 'modules/chat/SendMessageButton';
import { useUserPosts } from 'modules/posts/apiClient';
import ProfilePagePosts from 'modules/posts/ProfilePagePosts/ProfilePagePosts';
import { useGetUser, useGetUserFriends } from 'modules/users/apiClient';
import EditProfileModal from 'modules/users/EditProfileModal';
import AllFriendsModal from 'modules/users/Friends/AllFriendsModal';
import ProfilePageUserActions from 'modules/users/ProfilePageUserActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { userImageUrl } from 'services/api';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { openModalAction } from 'store/ui/uiSlice';

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const { data: user } = useGetUser(userId!);
  const { data: friends = [] } = useGetUserFriends(userId!);
  const { data: posts = [], isLoading } = useUserPosts(userId!);

  const isCurrentUserProfile = currentUserId === user?._id;

  return (
    <>
      <AllFriendsModal userId={userId!} />
      <div className='container'>
        <div className='flex gap-1 sm:gap-5 items-center mt-10'>
          <img
            className='rounded-full w-24 h-24 md:w-72 md:h-72'
            src={userImageUrl(userId)}
            alt='Profile'
          />
          <div className='flex flex-col gap-2 sm:gap-4'>
            <div className='flex gap-2 sm:gap-5 flex-wrap'>
              <h3 className='text-3xl font-bold'>{user?.fullName}</h3>
              <div className='flex gap-4'>
                <ProfilePageUserActions userId={userId!} />
              </div>
            </div>

            <div className='flex gap-6'>
              <p>{posts?.length ?? 0} Posts</p>
              <button
                className='border-b cursor-pointer'
                onClick={() => {
                  dispatch(openModalAction(modalNames.allFriends));
                }}
              >
                {friends.length ?? 0} Friends
              </button>
            </div>
            {!isCurrentUserProfile && (
              <SendMessageButton className='underline self-start' userId={userId!} />
            )}
          </div>
        </div>
        <ProfilePagePosts posts={posts.filter((post) => post.photo)} isLoading={isLoading} />
      </div>
      <EditProfileModal />
    </>
  );
}

export default ProfilePage;
