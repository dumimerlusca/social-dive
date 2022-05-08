export enum layoutNames {
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated',
}

export const queryKeys = {
  newsfeedPosts: 'newsfeedPosts',
  postComments: (postId: string) => `posts/${postId}/comments`,
  post: (postId: string) => `posts/${postId}`,
  userPosts: (userId: string) => `user/${userId}/posts`,
  user: (userId: string) => `user/${userId}`,
  peopleYouMightKnow: 'peopleYouMightKnow',
  loggedInUser: 'loggedInUser',
  chats: 'chats',
  chatMessages: (chatId: string) => `chat/${chatId}/messages`,
  friends: (userId: string) => `friends/${userId}`,
  sentFriendRequest: 'sentFriendRequest',
  receivedFriendRequest: 'receivedFriendRequest',
  notifications: 'notifications',
};
