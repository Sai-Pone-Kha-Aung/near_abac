describe('Category Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/postData?range=Sheet1!A1%3AM', {
      statusCode: 200,
      fixture: 'postdata',
    }).as('getPostData');
    cy.visit('/category/Cafe');
    cy.wait('@getPostData');
  });
  it('should display category', () => {
    cy.get('[data-testid="category-title"]').should('be.visible');
    cy.get('[data-testid="card"]').should('have.length', 1);
    cy.get('[data-testid="card-image"]').should('be.visible');
    cy.get('[data-testid="card-name"]').should('be.visible');
    cy.get('[data-testid="card-address"]').should('be.visible');
    cy.get('[data-testid="card-phone"]').should('be.visible');
    cy.get('[data-testid="card-url"]').should('be.visible');
    cy.get('[data-testid="card-button"]').should('be.visible');
  });
});