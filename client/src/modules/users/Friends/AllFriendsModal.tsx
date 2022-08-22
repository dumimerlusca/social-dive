import { modalNames } from 'common/constansts';
import ModalWrapper from 'components/ModalWrapper';
import React, { useCallback, useRef } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { isModalOpenSelector } from 'store/selectors/uiSelectors';
import { closeModalAction } from 'store/ui/uiSlice';
import { useGetUserFriends } from '../apiClient';
import UserListItem from '../UserListItem/UserListItem';

type AllFriendsModalProps = {
  userId: string;
};

const AllFriendsModal: React.FC<AllFriendsModalProps> = ({ userId }) => {
  const modalContentRef = useRef(null);

  const dispatch = useDispatch();
  const isModalOpen = useSelector(isModalOpenSelector(modalNames.allFriends));
  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalNames.allFriends));
  }, [dispatch]);

  const { data: friends = [] } = useGetUserFriends(userId);

  return (
    <ModalWrapper
      modalContentRef={modalContentRef}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    >
      <div
        className='rounded-3xl w-full max-h-[400px] max-w-[500px] bg-primary p-5 relative flex flex-col'
        ref={modalContentRef}
      >
        <button className='absolute top-4 right-4' onClick={closeModal}>
          <IoIosClose />
        </button>
        <h2 className='text-center text-2xl font-medium'>Friends</h2>
        <div className='overflow-auto px-2'>
          <ul>
            {friends.map((friend) => {
              return <UserListItem onClickListItem={closeModal} key={friend._id} user={friend} />;
            })}
          </ul>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AllFriendsModal;
