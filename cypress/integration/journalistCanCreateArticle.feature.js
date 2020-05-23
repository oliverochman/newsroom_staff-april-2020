describe('Journalist can create an article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles*",
      response: "fixture:success_message.json"
    })
    cy.visit("/")
  })

  it('successfully with title and body', () => {
    cy.get('input#title').type('This is the title')
    cy.get('textarea#body').type('This is the body this is the body this is the body this is the body this is the body.')
    cy.get('#post').click()
    cy.get('#message').should('contain', 'Article successfully created!')
  })

  it('unsuccessfully without entering any title', () => {
    cy.get('input#body').type('This is the body this is the body this is the body this is the body this is the body.')
    cy.get('#post').click()
    cy.get('#message').should('contain', "Title can't be blank")
  })

  it('unsuccessfully without entering any body text', () => {
    cy.get('input#title').type('This is the title')
    cy.get('#post').click()
    cy.get('#message').should('contain', "Body can't be blank")
  })
})