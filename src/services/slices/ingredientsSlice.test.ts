import ingredientsReducer from './ingredientsSlice';
import { fetchIngredients } from './ingredientsSlice';

const mockIngredients = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('должен установить isLoading в true при наличии запроса', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить ингредиенты и установить isLoading при успехе', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен сохранить ошибку и установить isLoading при неуспехе', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });
});
