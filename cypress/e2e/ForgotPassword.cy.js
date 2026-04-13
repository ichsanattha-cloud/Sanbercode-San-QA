import LoginPage from '../support/Pages/loginpage'
import ForgotPasswordPage from '../support/Pages/ForgotPasswordPage'

describe('OrangeHRM', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('Forgot Password', () => {
    cy.intercept('POST', '**/auth/requestPasswordResetCode').as('resetPassword')

    ForgotPasswordPage.clickForgotPassword()
    ForgotPasswordPage.inputUsername('Admin')
    ForgotPasswordPage.submit()

    cy.wait('@resetPassword')
    ForgotPasswordPage.verifySuccess()
  })

})