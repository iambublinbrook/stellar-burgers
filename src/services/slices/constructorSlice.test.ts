import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../slices/constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const mockBun: TIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

const mockMain: TIngredient = {
  _id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

const mockSauce: TIngredient = {
  _id: '3',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('constructorSlice reducer', () => {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  it('экшн добавления булок', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toBeTruthy();
    expect(state.bun!.name).toBe('Краторная булка N-200i');
    expect(state.bun).toHaveProperty('id');
  });

  it('экшн добавления начинки', () => {
    const action = addIngredient(mockMain);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('экшн удаления ингредиента', () => {
    let state = constructorReducer(initialState, addIngredient(mockMain));
    const ingredientId = state.ingredients[0].id;

    const newState = constructorReducer(state, removeIngredient(ingredientId));
    expect(newState.ingredients).toHaveLength(0);
  });

  it('экшн перемещения ингредиента вверх', () => {
    let state = constructorReducer(initialState, addIngredient(mockMain));
    state = constructorReducer(state, addIngredient(mockSauce));

    const [first, second] = state.ingredients;
    const newState = constructorReducer(state, moveIngredientUp(second.id));

    expect(newState.ingredients[0].id).toBe(second.id);
    expect(newState.ingredients[1].id).toBe(first.id);
  });

  it('экшн перемещения ингредиента вниз', () => {
    let state = constructorReducer(initialState, addIngredient(mockMain));
    state = constructorReducer(state, addIngredient(mockSauce));

    const [first, second] = state.ingredients;
    const newState = constructorReducer(state, moveIngredientDown(first.id));

    expect(newState.ingredients[0].id).toBe(second.id);
    expect(newState.ingredients[1].id).toBe(first.id);
  });

  it('экшн очистки конструктора', () => {
    let state = constructorReducer(initialState, addIngredient(mockBun));
    state = constructorReducer(state, addIngredient(mockMain));

    const newState = constructorReducer(state, clearConstructor());

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });
});
