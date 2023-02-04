class NewsfeedPageService {
  getNewPostInput() {
    return cy.get('#description');
  }

  getNewPostForm() {
    return cy.get('#new-post-form');
  }

  getPostListItem(postId: string) {
    return cy.get(`[data-test='newsfeed-post-${postId}']`);
  }

  clickSettingsButton() {
    cy.get("[data-test='newsfeed-post-settings-button']").click();
  }

  clickEditPost() {
    this.clickSettingsButton();
    cy.contains('Edit').click();
  }

  clickDeletePost() {
    this.clickSettingsButton();
    cy.contains('Delete').click();
  }

  updatePost(text: string) {
    cy.get('textarea').clear().type(text);

    cy.contains('Save').click();
  }

  createNewPost() {
    const postDescription = `${String(Math.random())} This is a new post`;

    newsfeedPageService.getNewPostInput().type(postDescription);
    newsfeedPageService.getNewPostForm().submit();
  }

  getNewCommentInput() {
    return cy.get("[data-test='new-comment-input']");
  }
  getNewCommentForm() {
    return cy.get("[data-test='new-comment-form']");
  }

  getPostCommentsList() {
    return cy.get("[data-test='newsfeed-post-comments-list']");
  }
}

const newsfeedPageService = new NewsfeedPageService();

export default newsfeedPageService;
