import authServiceCY from '../../services/AuthServiceCY';
import newsfeedPageService from '../../services/NewsfeedServiceCY';

describe('newsfeed', () => {
  beforeEach(() => {
    authServiceCY.addLoginToken();
    cy.visit('/');
  });

  it.skip('Creating a post, editing, deleting a post, making sure that the new values are still shown when switching pages', () => {
    cy.intercept('POST', '*/posts').as('createPost');

    newsfeedPageService.createNewPost();

    cy.wait('@createPost').then((req) => {
      const postId = req.response.body._id;

      cy.contains('Post created successfully', { matchCase: false });

      const newText = `This is an updated post ${postId}`;

      newsfeedPageService.getPostListItem(postId).within(($post) => {
        newsfeedPageService.clickEditPost();
        newsfeedPageService.updatePost(newText);

        cy.contains('Save').should('not.exist');
        cy.contains(newText);
      });
      cy.visit('/profile');
      cy.visit('/');

      cy.contains(newText);

      newsfeedPageService.getPostListItem(postId).within(() => {
        newsfeedPageService.clickDeletePost();
      });

      cy.contains(newText).should('not.exist');
    });
  });

  it('Should be able to add comments', () => {
    cy.intercept('POST', '*/posts').as('createPost');
    newsfeedPageService.createNewPost();

    cy.wait('@createPost').then((req) => {
      const postId = req.response.body._id;

      newsfeedPageService.getPostListItem(postId).within(() => {
        newsfeedPageService.getNewCommentInput().clear().type('Hello there 1');
        newsfeedPageService.getNewCommentForm().submit();

        newsfeedPageService.getPostCommentsList().children().should('have.length', 1);

        cy.visit('/profile');
        cy.visit('/');
      });

      newsfeedPageService.getPostListItem(postId).within(() => {
        newsfeedPageService.getPostCommentsList().children().should('have.length', 1);

        newsfeedPageService.clickDeletePost();
      });
    });
  });
});
