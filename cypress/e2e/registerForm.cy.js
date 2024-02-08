/// <reference types="cypress" />

describe("app works", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
  });
});

describe("form validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // Bu testin geçmemesi lazım
  it("form doldurulunca buton aktif oluyor", () => {
    cy.get('input[name="firstName"]').type("as");

    cy.get('input[name="lastName"]').type("Çağlar");
    cy.get('input[name="email"]').type("admin@test.com");
    cy.get('input[name="password"]').type("123456Qa!");

    cy.get("button").should("be.disabled");

    cy.get('input[name="firstName"]').clear().type("Ayşe Nur");

    cy.get("button").should("not.be.disabled");
  });
});
