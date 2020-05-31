describe("editor can publish articles", () => {
  beforeEach(() => {
    cy.login("editor");
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/admin/articles",
      response: "fixture:unpublished_articles.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/admin/articles/1",
      response: "fixture:single_unpublished_article.json",
    });
    cy.get("#review-nav").click();
  });
  describe("editor can checkout article", () => {
    it("can view checkout article", () => {
      cy.get("checkout-article-1").click();
      cy.get("").should("contain", "title 1");
    });
  });
});
