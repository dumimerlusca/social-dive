describe('login', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl')! + '/login');
  });

  it('Sign up button should redirect to the register page', () => {
    cy.contains('sign up', { matchCase: false }).click();
    cy.url().should('include', '/register');
  });

  it('clicking the login using demo account should log the user in the demo account', () => {
    cy.intercept('*/auth/login').as('login');
    cy.contains('login using demo account', { matchCase: false }).click();
    cy.wait('@login');
    cy.get('@login').should((req: any) => {
      expect(req?.response?.statusCode).to.equal(201);
    });
    cy.location('pathname').should('eq', '/');
  });

  it('should show show errors and log the user successfully', () => {
    const emailInput = cy.get('#field-email');
    const passwordInput = cy.get('#field-password');
    const loginButton = cy.contains('Log In');

    loginButton.click();

    cy.contains('Required field', { matchCase: false });
    cy.contains('required field', { matchCase: false });

    emailInput.type('someEmail');
    passwordInput.type('aaa');

    loginButton.click();

    cy.contains('Please enter a valid email', { matchCase: false });
    cy.contains("Password can't have less than 4 characters", { matchCase: false });

    emailInput.clear();
    passwordInput.clear();

    emailInput.type('demo1@gmail.com');
    passwordInput.type('123456');

    cy.intercept('*/auth/login').as('login');

    loginButton.click();

    cy.wait('@login');

    cy.location('pathname').should('eq', '/');
  });
});
