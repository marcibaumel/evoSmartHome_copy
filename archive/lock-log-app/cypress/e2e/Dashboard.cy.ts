import "@testing-library/cypress/add-commands";

describe('Dashboard tests', () => {
  it('Check cookie data it is empty', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Dashboard');
    cy.getCookie('jwt_data').should('not.exist');
  })
  it('Check data when login happened', () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").type('admin').should("be.enabled");
    cy.findByText('Login').click();
    cy.getCookie('jwt_data').should('exist');
    cy.url().should('eq', 'http://localhost:3000/')
  })
})