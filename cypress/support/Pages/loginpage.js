class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username)
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard')
  }

  verifyLoginFailed() {
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  }
}

export default new LoginPage()