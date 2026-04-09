describe('ReqRes API Automation', () => {

  const baseUrl = 'https://reqres.in/api';

  // 1. GET List Users
  it('GET List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  // 2. GET Single User
  it('GET Single User', () => {
    cy.request(`${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
    });
  });

  // 3. GET User Not Found
  it('GET User Not Found', () => {
    cy.request({
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // 4. POST Create User
  it('POST Create User', () => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'John',
      job: 'QA Engineer'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('John');
    });
  });

  // 5. PUT Update User
  it('PUT Update User', () => {
    cy.request('PUT', `${baseUrl}/users/2`, {
      name: 'Updated Name',
      job: 'Senior QA'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq('Senior QA');
    });
  });

  // 6. PATCH Update User
  it('PATCH Update User', () => {
    cy.request('PATCH', `${baseUrl}/users/2`, {
      job: 'QA Lead'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq('QA Lead');
    });
  });

  // 7. DELETE User
  it('DELETE User', () => {
    cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // 8. POST Register Successful
  it('POST Register Successful', () => {
    cy.request('POST', `${baseUrl}/register`, {
      email: "eve.holt@reqres.in",
      password: "pistol"
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  // 9. POST Login Failed
  it('POST Login Failed', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: "peter@klaven"
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.exist;
    });
  });

});