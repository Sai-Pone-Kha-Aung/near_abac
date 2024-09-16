describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the navbar', () => {
    cy.get('[data-testid="navbar-title"]').should('be.visible');
    cy.get('[data-testid="navbar-title"]').contains('Near ABAC');
  });

  it('should open search dialog', () => {
    cy.get('[data-testid="search-dialog"]').contains('Search');
    cy.get('[data-testid="search-dialog"]').click();
    cy.get('[data-testid="search-dialog"]').should('be.visible');
  });

  it('should search and navigate to category', () => {
    cy.fixture('postdata').then((data) => {
      cy.intercept('GET', 'http://localhost:3000/api/postData?range=Sheet1!A1%3AM', {
        statusCode: 200,
        body: data,
      }).as('getPostData');
      cy.get('[data-testid="search-dialog"]').click();
      cy.get('[data-testid="search-input"]').type('Cafe');
      cy.get('[data-testid="search-button"]').click();
      cy.wait('@getPostData');
    })
  });
})


describe('Feature Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/postData?range=Sheet1!A1%3AM', {
      statusCode: 200,
      fixture: 'postdata',
    }).as('getPostData');
    cy.visit('/');
    cy.wait('@getPostData');
  });

  it('should render the feature section', () => {
    cy.get('[data-testid="feature-page"]').should('be.visible');
    cy.get('[data-testid="feature-page"]').should('have.length', 3);
    cy.get('[data-testid="feature-card"]').should('be.visible');
    cy.get('[data-testid="feature-title"]').should('be.visible');
    cy.get('[data-testid="feature-title"]').first().trigger('mouseover');
    cy.get('[data-testid="feature-title"]').first().should('have.css', 'transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s');
    cy.get('[data-testid="feature-title"]').should('have.length', 3);
    cy.get('[data-testid="feature-title"]').first().click();
    cy.url().should('include', '/category/Cafe');
  });

  it('should render the feature card', () => {
    cy.get('[data-testid="card"]').should('be.visible');
    cy.get('[data-testid="card-image"]').should('be.visible');
    cy.get('[data-testid="card-name"]').should('be.visible');
    cy.get('[data-testid="card-address"]').should('be.visible');
    cy.get('[data-testid="card-phone"]').should('be.visible');
    cy.get('[data-testid="card-url"]').should('be.visible');
    cy.get('[data-testid="card-button"]').should('be.visible');
    cy.get('[data-testid="card-button"]').first().click();
    cy.url().should('include', '/singlepost/1');
  })
});