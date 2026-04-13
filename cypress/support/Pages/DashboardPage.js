class DashboardPage {

  clickDirectory() {
    cy.contains('Directory').click()
  }

  verifyDirectoryPage() {
    cy.url().should('include', '/directory')
    cy.get('h6').should('contain', 'Directory')
  }

}

export default new DashboardPage()