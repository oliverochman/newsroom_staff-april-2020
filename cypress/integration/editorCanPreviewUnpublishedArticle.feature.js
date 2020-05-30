describe("Editor can see unpublished articles", () => {
  describe("when logged in as editor", () => {
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

    it('can click and view an article on the review page',() => {
      cy.get('#article-1').click()
      cy.get('#preview').within(() => {
        cy.get('#preview-title').should('contain', "title 1")
        cy.get('#body').should('contain', "Lorem ipsum")
        cy.get('#image').should('be.visible')
      })
    })
  })
})