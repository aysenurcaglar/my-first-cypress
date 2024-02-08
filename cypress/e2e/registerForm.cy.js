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

  
  it("her bir geçersiz girdi için hata mesajı gösteriliyor", () => {
    cy.get('input[name="firstName"]').type("ab");
    cy.get('input[name="lastName"]').type("cd");
    cy.get('input[name="email"]').type("emre@wit.");
    cy.get('input[name="password"]').type("123456789");

    cy.contains('Please enter a valid name longer than 3 characters');
    cy.contains('Please enter a valid last name longer than 3 characters');
    cy.contains('Please enter a valid email address');
    cy.contains('Password must be at least 8 characters long, contain at least one upper case, one lower case, one digit and one special character');

    cy.get('input[name="firstName"]').clear().type("Ayşe Nur");
    cy.get('input[name="lastName"]').clear().type("Çağlar");
    cy.get('input[name="email"]').clear().type("admin@test.com");
    cy.get('input[name="password"]').clear().type("123456Qa!");

    cy.contains('Please enter a valid name longer than 3 characters').should('not.exist');
    cy.contains('Please enter a valid last name longer than 3 characters').should('not.exist');
    cy.contains('Please enter a valid email address').should('not.exist');
    cy.contains('Password must be at least 8 characters long, contain at least one upper case, one lower case, one digit and one special character').should('not.exist');
  });

  it("form geçerli değerlerle doldurulunca buton aktif oluyor", () => {
    cy.get('input[name="firstName"]').type("ab");
    cy.get('input[name="lastName"]').type("cd");
    cy.get('input[name="email"]').type("emre@wit.");
    cy.get('input[name="password"]').type("123456789");

    cy.get("button").should("be.disabled");

    cy.get('input[name="firstName"]').clear().type("Ayşe Nur");
    cy.get('input[name="lastName"]').clear().type("Çağlar");
    cy.get('input[name="email"]').clear().type("admin@test.com");
    cy.get('input[name="password"]').clear().type("123456Qa!");

    cy.get("button").should("not.be.disabled");
  });
});

describe("registration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  
  it("butona tıklanınca form sıfırlanıyor ve user id gösteriliyor", () => {
    cy.get('input[name="firstName"]').clear().type("Ayşe Nur");
    cy.get('input[name="lastName"]').clear().type("Çağlar");
    cy.get('input[name="email"]').clear().type("admin@test.com");
    cy.get('input[name="password"]').clear().type("123456Qa!");

    cy.get("button").click();

    cy.get('input[name="firstName"]').should("have.value", "");
    cy.get('input[name="lastName"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");

    cy.get('p').should('contain', 'User ID');

    cy.get("button").should("be.disabled");
});
})