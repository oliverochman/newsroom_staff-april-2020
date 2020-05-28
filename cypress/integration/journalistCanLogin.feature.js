describe('Journalist authenticates', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/');
  });

  it('does not see write page', () => {
    cy.get('button#post').should('not.exist')
  })

  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:journalist_successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:journalist_successful_login.json",
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
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:unsuccessful_login.json",
        headers: {
          uid:"user@mail.com"
        },
        status: 400
      })
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("wrongpassword");
        cy.get('Button').contains('Submit').click()
      });
      cy.get("#error-message").should("contain", "Invalid login credentials. Please try again.");
    });
  })

  describe('and can end his/her session', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:journalist_successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:journalist_successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "DELETE",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:logout.json",
        headers: {
          uid: "user@mail.com"
        }
      })
      cy.get('#login-form').within(() => {
        cy.get('#email').type('user@mail.com');
        cy.get('#password').type('password');
        cy.get('Button').contains('Submit').click();
      });
    })

    it('clicking the Log out button', () => {
      cy.get('#logout').contains('Log out user@mail.com').click()
      cy.get('#logout').should('not.exist')
    })

    it('and is redirected to login page', () => {
      cy.get('#logout').contains('Log out user@mail.com').click()
      cy.get('#login-form').should('be.visible')
    })
  })
});