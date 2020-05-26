Cypress.Commands.add('typeInStripeElement', (element, value) => {
  cy.get(`#${element} div iframe`)
    .then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find(`input[name^="${element}"]`)
        .type(value, { delay: 10 });
    });
})