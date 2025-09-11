declare namespace Cypress {
  interface Chainable {
    getIngredients(): Chainable<JQuery<HTMLElement>>;
    getModal(): Chainable<JQuery<HTMLElement>>;
    openIngredientModalByName(name: string): Chainable<JQuery<HTMLElement>>;
    closeModalByButton(): Chainable<void>;
    closeModalByOverlay(): Chainable<void>;
  }
}
