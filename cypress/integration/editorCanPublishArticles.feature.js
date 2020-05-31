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
      cy.get("#checkout-article-1").click();
      cy.get("#title").should("contain", "title 1");
      cy.get("#body").should("contain", "Lorem ipsum dolor");
      cy.get("#category").should("contain", "sport");
      cy.get("#article-class").parent().find("#free").should("be.checked");
      //   cy.get('#article-class').should('have.attr', 'free', 'true')
    });
  });

  describe("editor can change properties and publish", () => {
    beforeEach(() => {
      cy.get("#checkout-article-1").click();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/admin/articles/1",
        response: "fixture:successful_publish.json",
      });
    });

    it("change category and publish", () => {
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.get("#publish-btn").click();
      cy.get("#message").should("contain", "Article successfully published!");
    });

    it("change article class and publish", () => {
      cy.get("#radio").check("premium");
      cy.get("#publish-btn").click();
      cy.get("#message").should("contain", "Article successfully published!");
    });
  });
});

describe("journalist can't publish articles", () => {});
