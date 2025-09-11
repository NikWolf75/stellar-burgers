/// <reference types="cypress" />

import { INGREDIENT_BURGER } from './ingredients';

declare global {
  namespace Cypress {
    interface Chainable {
      getIngredients(): Cypress.Chainable;
      getModal(): Cypress.Chainable;
      openIngredientModalByName(name: string): Cypress.Chainable;
      closeModalByButton(): Cypress.Chainable;
      closeModalByOverlay(): Cypress.Chainable;
    }
  }
}

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'test-access-token');

    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Должна загрузить ингредиенты и показать булки и соусы', () => {
    cy.getIngredients().should('have.length.at.least', 1);
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
  });

  it('Добавляет ингредиент при клике по кнопке «Добавить»', () => {
    const topBunSelector = '[data-cy="bun-top"]';
    const bottomBunSelector = '[data-cy="bun-bottom"]';
    const ingredientItemSelector = '[data-cy="ingredient-item"]';

    cy.get(INGREDIENT_BURGER).should('not.exist');
    cy.get(topBunSelector).should('not.exist');
    cy.get(bottomBunSelector).should('not.exist');

    cy.contains('Краторная булка N-200i')
      .parents(ingredientItemSelector)
      .find('button')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents(ingredientItemSelector)
      .find('button')
      .click();

    cy.get(topBunSelector).should('contain', 'Краторная булка N-200i (верх)');
    cy.get(INGREDIENT_BURGER).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(bottomBunSelector).should('contain', 'Краторная булка N-200i (низ)');
  });

  it('Открывает модальное окно ингредиента', () => {
    cy.getModal().should('not.exist');
    cy.openIngredientModalByName('Краторная булка N-200i');
    cy.getModal()
      .as('modal')
      .should('exist')
      .and('contain', 'Краторная булка N-200i');
  });

  it('Закрывает модальное окно по крестику', () => {
    cy.getIngredients().first().click();
    cy.getModal().should('exist');
    cy.closeModalByButton();
    cy.getModal().should('not.exist');
  });

  it('Закрывает модальное окно по клику на оверлей', () => {
    cy.getIngredients().first().click();
    cy.getModal().should('exist');
    cy.closeModalByOverlay();
    cy.getModal().should('not.exist');
  });

  it('Закрывает модальное окно по нажатию ESC', () => {
    cy.getIngredients().first().click();
    cy.getModal().should('exist');
    cy.get('body').type('{esc}');
    cy.getModal().should('not.exist');
  });

  it('Собирает бургер и оформляет заказ', () => {
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');

    cy.getIngredients().as('ingredients');
    cy.get('@ingredients').first().find('button').click();
    cy.get('@ingredients').last().find('button').click();

    cy.contains('Оформить заказ').click();

    cy.getModal().as('modal').should('exist').and('contain', '1234');
    cy.closeModalByButton();
    cy.getModal().should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
