import { render } from '@testing-library/react';
import IComment from 'interfaces/IComment';
import CommentListItem from './CommentListItem';
import users from 'data/users';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const initialState = {
  auth: {
    currentUser: users[0],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

const dummyComment: IComment = {
  _id: '7637823242',
  user: users[0],
  postId: '723842424',
  text: 'Dummy comment',
  createdAt: '3749835353',
  updatedAt: '78482942',
  likes: users,
};

describe('Comment list item', () => {
  it('should render an image', () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <CommentListItem
            onDeleteCommentSucceeded={() => {}}
            postId='82832'
            comment={dummyComment}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(view.getByRole('img'))?.toBeInTheDocument();
  });
});
