import LoginPage from "../support/Pages/loginpage"
describe('OrangeHRM', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('Login Berhasil', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.inputUsername('Admin')
    LoginPage.inputPassword('admin123')
    LoginPage.clickLogin()

    cy.wait('@loginRequest')
    LoginPage.verifyLoginSuccess()
  })

  it('Login Gagal', () => {
    LoginPage.inputUsername('Admin')
    LoginPage.inputPassword('salah123')
    LoginPage.clickLogin()

    LoginPage.verifyLoginFailed()
  })

})