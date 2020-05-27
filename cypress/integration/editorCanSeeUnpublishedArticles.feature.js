describe("Editor can see unpublished articles", () => {
  beforeEach(() => {
    cy.login();
  });

  cy.get("#review-nav").click();

  it("articles is shown", () => {
    cy.get("#article-1").should("contain", "title 1");
    cy.get("#article-2").should("contain", "title 2");
  });
});
