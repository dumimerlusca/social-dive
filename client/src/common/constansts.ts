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
  searchUsers: (query: string) => `users/search/${query}`,
  peopleYouMightKnow: 'peopleYouMightKnow',
  loggedInUser: 'loggedInUser',
  chats: 'chats',
  chatMessages: (chatId: string) => `chat/${chatId}/messages`,
  friends: (userId: string) => `friends/${userId}`,
  sentFriendRequest: 'sentFriendRequest',
  receivedFriendRequest: 'receivedFriendRequest',
  notifications: 'notifications',
};

export const modalNames = {
  editProfile: 'editProfile',
  allFriends: 'allFriends',
};

export const HEADER_HEIGHT = 116;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const localStorageItems = {
  token: 'social-dive-token',
};
