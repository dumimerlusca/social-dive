import { modalNames } from 'common/constansts';
import SendMessageButton from 'modules/chat/SendMessageButton';
import { useUserPosts } from 'modules/posts/apiClient';
import ProfilePagePosts from 'modules/posts/ProfilePagePosts/ProfilePagePosts';
import { useGetUser, useGetUserFriends } from 'modules/users/apiClient';
import EditProfileModal from 'modules/users/EditProfileModal';
import AllFriendsModal from 'modules/users/Friends/AllFriendsModal';
import ProfilePageUserActions from 'modules/users/ProfilePageUserActions';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { userImageUrl } from 'services/api';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { openModalAction } from 'store/ui/uiSlice';

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId);
  const { data: user, isLoading: userLoading } = useGetUser(userId!);
  const { data: friends = [], isLoading: isLoadingFriends } = useGetUserFriends(userId!);
  const { data: posts = [], isLoading: isLoadingPosts } = useUserPosts(userId!);

  const isCurrentUserProfile = useMemo(
    () => currentUserId === user?._id,
    [currentUserId, user?._id],
  );

  return (
    <>
      <AllFriendsModal userId={userId!} />
      <div className='container'>
        <div className='flex gap-1 sm:gap-5 items-center mt-10'>
          {userLoading ? (
            <div className='rounded-full w-24 h-24 md:w-72 md:h-72 overflow-hidden'>
              <Skeleton className='w-full h-full scale-150' />
            </div>
          ) : (
            <img
              className='rounded-full w-24 h-24 md:w-72 md:h-72'
              src={userImageUrl(userId)}
              alt='Profile'
            />
          )}

          <div className='flex flex-col gap-2 sm:gap-4'>
            {userLoading ? (
              <Skeleton className='h-8 w-[100vw] max-w-md' />
            ) : (
              <div className='flex gap-2 sm:gap-5 flex-wrap'>
                <h3 className='text-3xl font-bold'>{user?.fullName}</h3>
                <div className='flex gap-4'>
                  <ProfilePageUserActions userId={userId!} />
                </div>
              </div>
            )}

            <div className='flex gap-6'>
              {isLoadingPosts ? (
                <Skeleton className='w-24 h-8' />
              ) : (
                <p>{posts?.length ?? 0} Posts</p>
              )}
              {isLoadingFriends ? (
                <Skeleton className='w-24 h-8' />
              ) : (
                <button
                  className='border-b cursor-pointer'
                  onClick={() => {
                    dispatch(openModalAction(modalNames.allFriends));
                  }}
                >
                  {friends.length ?? 0} Friends
                </button>
              )}
            </div>
            {!isCurrentUserProfile && !userLoading && (
              <SendMessageButton className='underline self-start' userId={userId!} />
            )}
          </div>
        </div>
        <ProfilePagePosts posts={posts.filter((post) => post.photo)} isLoading={isLoadingPosts} />
      </div>
      <EditProfileModal />
    </>
  );
}

export default ProfilePage;
