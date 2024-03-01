import "@testing-library/cypress/add-commands";

describe('Devices tests', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").type('admin').should("be.enabled");
    cy.findByText('Login').click();
    cy.getCookie('jwt_data');
    cy.url().should('eq', 'http://localhost:3000/')
    cy.findByText('Devices').click();
    cy.url().should('eq', 'http://localhost:3000/devices')
  })

  it('Check device elements', () => {
    cy.findByText('Lock').should("be.visible");
  })

  it('Check lock device route', () => {
    cy.findByText('Lock').should("be.visible");
    cy.findByText('Lock').click();
    cy.url().should('include', 'http://localhost:3000/lock')
  });

  it('Check lock device route', () => {
    cy.findByText('Lock').should("be.visible");
    cy.findByTestId('choose-device-field-testid').type('TV');
    cy.findByText('Lock').should("not.exist");
    cy.findByText('TV').click();
    cy.url().should('include', 'http://localhost:3000/tv')
  });
})