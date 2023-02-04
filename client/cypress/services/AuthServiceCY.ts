class AuthServiceCY {
  addLoginToken() {
    localStorage.setItem('social-dive-token', Cypress.env('LOGIN_TOKEN'));
  }
}

const authServiceCY = new AuthServiceCY();

export default authServiceCY;
