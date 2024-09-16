describe('Single Post Page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/postData?range=Sheet1!A1%3AK', {
            statusCode: 200,
            fixture: 'postdata',
        })
        cy.visit('/singlepost/1');
    })

    it('should display single post', () => {
        cy.get('[data-testid="single-post"]').should('be.visible');
        cy.get('[data-testid="single-post"]').should('have.length', 1);
        cy.get('[data-testid="single-post-image"]').should('be.visible');
        cy.get('[data-testid="single-post-image"]').should('have.length', 1);
        cy.get('[data-testid="single-post-name"]').should('be.visible');
        cy.get('[data-testid="single-post-category"]').should('be.visible');
        cy.get('[data-testid="single-post-address"]').should('be.visible');
        cy.get('[data-testid="single-post-phone"]').should('be.visible');
        cy.get('[data-testid="single-post-url"]').should('be.visible');

    })
});