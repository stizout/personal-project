describe('Add to Cart', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Focus on Add', () => {
        cy.focused().should('have.class', 'add-button')
    });
});

describe('Focus on Search', () => {
    it('Accepts Input', () => {
        const text = 'Mountain Dew';
        cy.get('.input-search').type(text).should('have.value', text);
    });
});

// describe('adds to cart', () => {
//   context('No items', () => {
//     it('adds to cart', () => {
//         cy.get('.add-button').click();
//     });
//   });
// });

describe('get food', () => {
    it('gets food', () => {
        cy.request('GET', '/login').its('body').should('include', "<h1>Please Login</h1>");
    });
});