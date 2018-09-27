

describe('Sort', () => {
    it('Sort by Price Descending', () => {
        cy.visit('/');
        cy.contains('Personal Cart')
        cy.get('#sort').trigger('mouseover')
        cy.get('.fa-arrow-alt-circle-up').click()
    })
})

describe('Sort', () => {
    it('Sort by Price Descending', () => {
        cy.visit('/');
        cy.contains('Personal Cart')
        cy.get('#sort').trigger('mouseover')
        cy.get('.fa-arrow-alt-circle-down').click()
    })
})