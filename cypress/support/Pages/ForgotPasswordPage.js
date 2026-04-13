class ForgotPasswordPage {

  clickForgotPassword() {
    cy.contains('Forgot your password?').click()
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username)
  }

  submit() {
    cy.get('button[type="submit"]').click()
  }

  verifySuccess() {
    cy.get('.oxd-text--h6')
      .should('contain', 'Reset Password link sent successfully')
  }
}

export default new ForgotPasswordPage()