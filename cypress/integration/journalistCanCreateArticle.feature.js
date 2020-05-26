describe("Journalist can create an article", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
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
  });

  it("successfully with title and body", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles*",
      response: "fixture:success_message.json",
    });
    cy.get("input#title").type("This is the title");
    cy.get("textarea#body").type(
      "This is the body this is the body this is the body this is the body this is the body."
    );
    cy.get("#post").click();
    cy.get("#message").should("contain", "Article successfully created!");
  });

  it("unsuccessfully without entering any title", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles*",
      response: "fixture:title_blank_message.json",
      status: 400
    });
    cy.get("textarea#body").type(
      "This is the body this is the body this is the body this is the body this is the body."
    );
    cy.get("#post").click();
    cy.get("#message").should("contain", "Title can't be blank");
  });

  it("unsuccessfully without entering any body text", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles*",
      response: "fixture:body_blank_message.json",
      status: 400
    });
    cy.get("input#title").type("This is the title");
    cy.get("#post").click();
    cy.get("#message").should("contain", "Body can't be blank");
  });
});
