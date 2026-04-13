import LoginPage from "../../support/Pages/loginpage"
import DashboardPage from "../../support/Pages/DashboardPage"

describe('OrangeHRM', () => {

  beforeEach(() => {
    LoginPage.visit()

    LoginPage.inputUsername('Admin')
    LoginPage.inputPassword('admin123')
    LoginPage.clickLogin()
  })

  it('Akses Menu Directory', () => {
    cy.intercept('GET', '**/directory/employees*').as('directoryPage')

    DashboardPage.clickDirectory()
    cy.wait('@directoryPage')

    DashboardPage.verifyDirectoryPage()
  })

})