import "@testing-library/cypress/add-commands";

describe("Test Login App", () => {

  it("When email input valid", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").should("be.enabled");
  });

  it("When email input invalid", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
  });

  it("When email input invalid but Login button is pressed", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByText('Login').click();
    cy.findByText('Email or password error');
  });

  it("When email input valid but password is invalid", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").type('wrong password').should("be.enabled");
    cy.findByText('Login').click();
    cy.findByText('Email or password error');
  });

  it("When email and password valid then auth cookie should exists", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").type('admin').should("be.enabled");
    cy.findByText('Login').click();
    cy.getCookie('jwt_data');
  });

  it("When email and password valid then it should redirect to localhost", () => {
    cy.visit("http://localhost:3000/login");
    cy.findByTestId("password-input").should("be.visible");
    cy.findByTestId("password-input").should("be.disabled");
    cy.findByTestId("email-input").type("admin@email.com").should("be.visible");
    cy.findByTestId("password-input").type('admin').should("be.enabled");
    cy.findByText('Login').click();
    cy.getCookie('jwt_data');
    cy.url().should('eq', 'http://localhost:3000/')
  });

});
