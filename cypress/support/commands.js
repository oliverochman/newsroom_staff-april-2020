import "cypress-file-upload";

Cypress.Commands.add("file_upload", (file, element, type) => {
  const selector = element;
  const fixturePath = file;
  cy.get(selector).then((subject) =>
    cy.window().then((win) =>
      cy
        .fixture(fixturePath, "base64")
        .then(Cypress.Blob.base64StringToBlob)
        .then((blob) => {
          const el = subject[0];
          const testFile = new win.File([blob], name, { type });
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          cy.wrap(subject).trigger("change", { force: true });
        })
    )
  );
});

Cypress.Commands.add("login", (role) => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:${role}_successful_login.json`,
    headers: {
      uid: `${role}@mail.com`,
    },
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:${role}_successful_login.json`,
    headers: {
      uid: `${role}@mail.com`,
    },
  });
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("/");
  cy.get("#login-form").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("Button").contains("Submit").click();
  });
});
