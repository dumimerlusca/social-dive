import IPost from 'interfaces/IPost';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
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
  const { data: newsfeedPostsData, isLoading } = useNewsfeedPosts(pageNumber, LIMIT);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [deletedPostsIDs, setDeletedPostsIDs] = useState<string[]>([]);

  useEffect(() => {
    if (!newsfeedPostsData?.count) return;
    setTotalDocumentsCount(newsfeedPostsData.count);
  }, [newsfeedPostsData?.count]);

  useEffect(() => {
    if (!newsfeedPostsData) return;
    const newPosts = newsfeedPostsData.data.filter((post) => {
      const alreadyExists = posts.find((existentPost) => existentPost._id === post._id);
      const isDeleted = deletedPostsIDs.includes(post._id);
      if (alreadyExists || isDeleted) return null;
      return post;
    });
    if (newPosts.length === 0) return;
    console.log('HELLO', newsfeedPostsData);
    setPosts((prev) => [...prev, ...newPosts]);
  }, [deletedPostsIDs, newsfeedPostsData, pageNumber, posts]);

  const onCreatePostSucceeded = useCallback((newPost: IPost) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const onDeletePostsSucceeded = useCallback((postId: string) => {
    setDeletedPostsIDs((prev) => [...prev, postId]);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  }, []);

  useEffect(() => {
    return () => {
      console.log('UNMOUNT');
    };
  }, []);

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
