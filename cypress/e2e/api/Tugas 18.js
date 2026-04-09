describe('API Testing - Categories (Platzi Fake API)', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1/categories';

  // 1. GET all categories
  it('GET - Get all categories', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  // 2. GET category by ID
  it('GET - Get category by ID', () => {
    cy.request('GET', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
    });
  });

  // 3. POST create new category
  it('POST - Create new category', () => {
    cy.request('POST', baseUrl, {
      name: "Test Category Cypress",
      image: "https://placeimg.com/640/480/any"
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Test Category Cypress');
    });
  });

  // 4. PUT update category
  it('PUT - Update category', () => {
    cy.request('PUT', `${baseUrl}/1`, {
      name: "Updated Category Cypress"
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
    });
  });

  // 5. DELETE category
  it('DELETE - Delete category', () => {
    cy.request('DELETE', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // 6. GET with query params
  it('GET - With limit parameter', () => {
    cy.request('GET', `${baseUrl}?limit=5`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.lte(5);
    });
  });

  // 7. GET invalid endpoint (negative test)
  it('GET - Invalid endpoint', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // 8. POST invalid body (negative test)
  it('POST - Invalid body', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      failOnStatusCode: false,
      body: {
        wrongField: "Invalid"
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([500]);
    });
  });

});