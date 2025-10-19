import { testUrl, modalSelector, bunName } from '../support/constants';

describe('Burger Conctructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 401,
      body: { success: false, message: 'Unauthorized' }
    });

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(testUrl, {
      onBeforeLoad(win) {
      }
    });

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Модальное окно ингредиента', () => {
    it('открытие и закрытие модального окна ингредиента', () => {
      cy.contains(bunName).click();
      cy.get(modalSelector).should('be.visible');
      cy.get('[data-testid="modal-close"]').click();
      cy.get(modalSelector).should('not.exist');
    });

    it('отображение правильного ингредиента в модальном окне', () => {
      cy.contains(bunName).click();
      cy.get(modalSelector)
        .should('contain.text', bunName)
        .should('contain.text', '420') // калории
        .should('contain.text', '80')  // белки
        .should('contain.text', '53'); // углеводы
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавление булки в конструктор', () => {
      cy.addIngredient(bunName);
      cy.get('[data-testid="constructor-bun-top"]')
        .should('contain.text', bunName)
        .should('not.contain.text', 'Выберите булки');
    });

    it('добавление начинки в конструктор', () => {
      cy.addIngredient(bunName);
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.get('[data-testid="constructor-ingredients"]')
        .should('contain.text', 'Биокотлета')
        .should('not.contain.text', 'Выберите начинку');
    });
  });

  describe('Оформление заказа', () => {
    it('неавторизованный пользователь перенаправляется на /login при попытке заказа', () => {
      // Собираем бургер
      cy.addIngredient(bunName);
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.addIngredient('Соус Spicy-X');

      cy.get('[data-testid="order-button"]').click();
      cy.url().should('include', '/login');
    });

    it('авторизованный пользователь может оформить заказ', () => {
      cy.setCookie('accessToken', 'mock-access-token');
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');

      cy.window().then((win) => {
        (win as any).store.dispatch({
          type: 'user/checkAuth/fulfilled',
          payload: { email: 'test@test.com', name: 'Test User' }
        });
      });

      // Собираем бургер
      cy.addIngredient(bunName);
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.addIngredient('Соус Spicy-X');

      cy.get('[data-testid="constructor-bun-top"]').should('exist');

      //Подменяем заказ
      cy.intercept('POST', '**/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      // Оформляем заказ
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      cy.get(modalSelector).should('be.visible');
      cy.get(modalSelector).contains('12345');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('Ваш заказ начали готовить').should('be.visible');

      // Закрываем модалку
      cy.get('[data-testid="modal-close"]').click();
      cy.get(modalSelector).should('not.exist');
    });
  });
});
