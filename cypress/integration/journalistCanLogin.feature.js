describe('Journalist authenticates', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/');
  });

  it('cannot go to write page', () => {
    cy.visit('/write');
    cy.get('button#post').should('not.exist')
  })

  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.get('#login-form').within(() => {
        cy.get('#email').type('user@mail.com');
        cy.get('#password').type('password');
        cy.get('Button').contains('Submit').click();
      });
    })

    it('with valid credentials', () => {
      cy.get('.header').should('contain', 'Log out user@mail.com');
    });

    it('and is redirected to Write page', () => {
      cy.get('button#post').should('be.visible')
    })
  })

  describe('unsuccessfully', () => {
    it("with invalid credentials", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/sign_in",
        response: "fixture:unsuccessful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("wrongpassword");
        cy.get('Button').contains('Submit').click()
      });
      cy.get("#error-message").should("contain", "Invalid login credentials");
    });
  })
});