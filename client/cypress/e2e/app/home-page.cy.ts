describe('Home page', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl') ?? '');
  });

  it('should redirect to /home if there is no access token in the localstorage', () => {
    cy.url().should('include', '/home');
  });

  it('log in button should open the login page', () => {
    cy.contains('Log In').click();
    cy.url().should('include', 'login');
  });

  it('sign up button should open the register page', () => {
    cy.contains('Sign Up!').click();
    cy.url().should('include', 'register');
  });

  it('it should try to log the user in if there is an access token in the local storage', () => {
    localStorage.setItem('social-dive-token', 'randomTokenh2yhb7wqbyeqdeqe');
    cy.intercept('*/auth/user').as('loadUser');
    cy.wait('@loadUser');
    cy.url().should('include', 'home');
  });

  it('login with demo account button should log the user in the demo accout', () => {
    cy.intercept('*/auth/login').as('login');
    cy.contains('login using demo account', { matchCase: false }).click();
    cy.wait('@login');
    cy.get('@login').should((req: any) => {
      expect(req?.response?.statusCode).to.equal(201);
    });
    cy.location('pathname').should('eq', '/');
  });
});
