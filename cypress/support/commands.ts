/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//Добавление ингредиента в конструктор
Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.contains(ingredientName).parent().find('button').click();
});

//закрытеи модалки
Cypress.Commands.add('closeModal', () => {
  cy.get('[data-testid="modal-close"]').click();
  cy.get('[data-testid="modal"]').should('not.exist');
});

//очистка конструктора
Cypress.Commands.add('checkConstructorCleared', () => {
  cy.contains('Выберите начинку', { timeout: 10000 }).should('exist');
  cy.contains('Выберите булки', { timeout: 10000 }).should('exist');
  cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
});

//Создание заказа
Cypress.Commands.add('createOrder', (orderNumber = 12345) => {
  cy.intercept('POST', '**/api/orders', {
    statusCode: 200,
    body: {
      success: true,
      order: { number: orderNumber }
    }
  }).as('createOrder');

  cy.get('[data-testid="order-button"]').click();
  cy.wait('@createOrder');
});

//проверка авторизации
Cypress.Commands.add('loginUser', () => {
  cy.intercept('GET', '**/api/auth/user', {
    statusCode: 200,
    body: {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' }
    }
  }).as('getUser');

  cy.setCookie('accessToken', 'mock-access-token');
  window.localStorage.setItem('refreshToken', 'mock-refresh-token');
  cy.visit('http://localhost:4000/profile');
  cy.wait('@getUser');
  cy.visit('http://localhost:4000/');
});