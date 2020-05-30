describe("Editor can see unpublished articles", () => {
  describe("when logged in as editor", () => {
    beforeEach(() => {
      cy.login("editor");
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/admin/articles",
        response: "fixture:unpublished_articles.json",
      });
      cy.get("#review-nav").click();
    });

    it("articles are shown", () => {
      cy.get("#article-1").should("contain", "title 1");
      cy.get("#article-2").should("contain", "title 2");
    });

    it("article details are shown", () => {
      cy.get("#article-1").within(() => {
        cy.get(".description").should("contain", "Created at: ");
        cy.get(".description").should("contain", "Category:");
      });
    });

    it("on the /review page", () => {
      cy.url().should("contain", "/review");
    });
  });

  describe("but logged in journalists cannot", () => {
    beforeEach(() => {
      cy.login("journalist");
    });

    it("and cannot see the nav-button", () => {
      cy.get("#review-nav").should("not.exist");
    });

    it("and is redirected when going to page directly", () => {
      cy.visit("/review");
      cy.url().should("not.contain", "/review");
    });
  });
});
