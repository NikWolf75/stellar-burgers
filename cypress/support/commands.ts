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

// Кастомные команды для взаимодействия с ингредиентами и модальными окнами

/// <reference types="cypress" />

/// <reference types="cypress" />

Cypress.Commands.add(
  'getIngredients',
  (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get('[data-cy="ingredient-item"]');
  }
);

Cypress.Commands.add('getModal', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-cy="modal"]');
});

Cypress.Commands.add(
  'openIngredientModalByName',
  (name: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .contains(name)
      .click()
      .then(() => cy.get('[data-cy="modal"]'));
  }
);

Cypress.Commands.add('closeModalByButton', () => {
  cy.get('[data-cy="modal-close-button"]').click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy="modal-overlay"]').click({ force: true });
});
