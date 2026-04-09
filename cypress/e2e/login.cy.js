describe('OrangeHRM Login Test with Intercept', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
  })

  it('TC01 - Login berhasil dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequestValid')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequestValid').its('response.statusCode').should('eq', 302)

    cy.url().should('include', '/dashboard')
  })

  it('TC02 - Login gagal dengan password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('loginWrongPass')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginWrongPass').its('response.statusCode').should('eq', 302)

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC03 - Login gagal dengan username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('loginWrongUser')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginWrongUser').its('request.body')
      .should('include', 'WrongUser')

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC04 - Login gagal jika username kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyUsername')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Tidak ada request karena validasi frontend
    cy.get('@emptyUsername.all').should('have.length', 0)

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC05 - Login gagal jika password kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyPassword')

    cy.get('input[name="username"]').type('admin')
    cy.get('button[type="submit"]').click()

    cy.get('@emptyPassword.all').should('have.length', 0)

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC06 - Verifikasi API dipanggil sekali saat login', () => {

    cy.intercept('POST', '**/auth/validate').as('loginCallCount')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginCallCount')
    cy.get('@loginCallCount.all').should('have.length', 1)
  })

})
