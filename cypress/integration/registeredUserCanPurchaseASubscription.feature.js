describe("registered user can purchase a subscription", () => {
    beforeEach(() => {
      cy.server();
      // for index action
      cy.route({
        method: "GET",
        url: "**/articles",
        response: "fixture:articles_list_response.json"
      });

      // for payment response
      cy.route({
        method: "POST",
        url: "**/subscriptions",
        response: { message: "Transaction successfull" }
      });

      // for login with j-tockauth
      cy.route({
        method: "POST",
        url: "**/auth/**",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com"
        }
      });

      // for validate token request that j-tockauth makes automatically
      cy.route({
        method: "GET",
        url: "**/auth/**",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com"
        }
      });
      cy.visit("/");

      // login the user
      cy.get('#login-form').within(() => {
        cy.get('#email').type('user@mail.com');
        cy.get('#password').type('password');
        cy.get('Button').contains('Submit').click();
      });
    });

    it("by clicking buy subscription", () => {
      // here we assume that there is a button in the header or something that will be
      // visible after logging in
      cy.get("button")
        .contains("Buy Subscription")
        .click();

      // this can be removed but could be good to check that the form has rendered during development
      // due to the <Elements /> can be tricky during the implementation of stripe
      cy.get("form[id='payment-form']").should("be.visible");
      cy.wait(1000)

      // the "typeInStripeElement" command is defined in the commands.js file, the next snippet displays this
      cy.typeInStripeElement("cardnumber", "4242424242424242");
      cy.typeInStripeElement("exp-date", "0425");
      cy.typeInStripeElement("cvc", "575");

      cy.get("button")
        .contains("Submit Payment")
        .click();

      // this is just an example of how we might show off that the user had a successfull transaction
      cy.get("#subscription-message").should(
        "contain",
        "Transaction successfull"
      );
    });
  });
