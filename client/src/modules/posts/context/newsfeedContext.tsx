import { queryKeys } from 'common/constansts';
import IPost from 'interfaces/IPost';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNewsfeedPosts } from '../apiClient';

type NewsfeedContextType = {
  pageNumber: number;
  posts: IPost[];
  totalDocumentsCount: number;
  setPageNumber: any;
  isLoading: boolean;
  onCreatePostSucceeded: (newPost: IPost) => void;
  onDeletePostsSucceeded: (postId: string) => void;
};

const NewsfeedContext = createContext<NewsfeedContextType>({} as NewsfeedContextType);

const LIMIT = 2;

export const NewsfeedContextProvider: React.FC = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalDocumentsCount, setTotalDocumentsCount] = useState(0);
  const { data: newsfeedPostsData, isLoading, isFetching } = useNewsfeedPosts(pageNumber, LIMIT);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [deletedPostsIDs, setDeletedPostsIDs] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!newsfeedPostsData?.total) return;
    setTotalDocumentsCount(newsfeedPostsData.total);
  }, [newsfeedPostsData?.total]);

  useEffect(() => {
    if (!newsfeedPostsData) return;

    setPosts((prev) => {
      const prevPosts = [...prev];

      const newPosts = newsfeedPostsData.data.filter((post) => {
        const existingItemIndex = prevPosts.findIndex(
          (existentPost) => existentPost._id === post._id,
        );
        const alreadyExists = existingItemIndex !== -1;
        // We also need to update the existing ones with the latest data
        if (alreadyExists) {
          prevPosts[existingItemIndex] = post;
        }

        const isDeleted = deletedPostsIDs.includes(post._id);
        if (alreadyExists || isDeleted) return null;
        return post;
      });

      const newPostsList = [...prevPosts, ...newPosts];
      return newPostsList;
    });
  }, [deletedPostsIDs, newsfeedPostsData, pageNumber, isFetching]);

  const onCreatePostSucceeded = useCallback((newPost: IPost) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const onDeletePostsSucceeded = useCallback((postId: string) => {
    setDeletedPostsIDs((prev) => [...prev, postId]);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  }, []);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.newsfeedPosts],
        refetchActive: true,
        refetchInactive: true,
      });
    };
  }, [queryClient]);

  return (
    <NewsfeedContext.Provider
      value={{
        pageNumber,
        posts,
        totalDocumentsCount,
        isLoading,
        setPageNumber,
        onCreatePostSucceeded,
        onDeletePostsSucceeded,
      }}
    >
      {children}
    </NewsfeedContext.Provider>
  );
};

const useNewsfeedContext = () => useContext(NewsfeedContext);

export default useNewsfeedContext;
