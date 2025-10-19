/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Добавляет ингредиент в конструктор по названию
     * @example cy.addIngredient('Краторная булка N-200i')
     */
    addIngredient(ingredientName: string): Chainable<void>

    /**
     * Закрывает модальное окно
     * @example cy.closeModal()
     */
    closeModal(): Chainable<void>

    /**
     * Проверяет очистку конструктора
     * @example cy.checkConstructorCleared()
     */
    checkConstructorCleared(): Chainable<void>

    /**
    * Авторизует пользователя
    * @example cy.loginUser()
    */
    loginUser(): Chainable<void>

    /**
     * Оформляет заказ (конструктор должен быть заполнен)
     * @example cy.createOrder()
     */
    createOrder(): Chainable<void>;
  }
}