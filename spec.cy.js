describe('OrangeHRM Login Test', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
  })

  it('TC01 - San Login berhasil dengan data valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('TC02 - San Login gagal dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC03 - San Login gagal dengan username salah', () => {
    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC04 - San Login gagal jika username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC05 - San Login gagal jika password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC06 - San Login gagal jika semua field kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1)
  })

  it('TC07 - Verifikasi elemen input tampil', () => {
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

})
