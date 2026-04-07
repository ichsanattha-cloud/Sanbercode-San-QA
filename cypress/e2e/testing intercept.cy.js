describe('OrangeHRM Login Test with Intercept', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
  })

  it('TC01 - Login berhasil dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginSuccess')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 302)

    cy.url().should('include', '/dashboard')
  })


  it('TC02 - Login gagal dengan password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPassword').its('response.statusCode').should('eq', 200)

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  it('TC03 - Login gagal dengan username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongUsername')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUsername').its('response.statusCode').should('eq', 200)

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })


  it('TC04 - Login gagal jika username kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyUsername')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@emptyUsername')

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })


  it('TC05 - Login gagal jika password kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.wait('@emptyPassword')

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })


  it('TC06 - Login gagal jika semua field kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyAll')

    cy.get('button[type="submit"]').click()

    cy.wait('@emptyAll')

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1)
  })


  it('TC07 - Verifikasi elemen input tampil', () => {

    cy.intercept('GET', '**/web/index.php/auth/login').as('loadLoginPage')

    cy.visit(url)

    cy.wait('@loadLoginPage').its('response.statusCode').should('eq', 200)

    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

})