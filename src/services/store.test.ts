import { rootReducer } from './store';

describe('rootReducer initialization', () => {
  it('should initialize all slices with their default state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    // userSlice
    expect(state.user).toEqual({
      user: null,
      isInit: false,
      isLoading: false,
      error: null
    });

    // ingredientsSlice
    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });

    // constructorSlice
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    // orderSlice
    expect(state.order).toEqual({
      orderModalData: null,
      orderRequest: false,
      orderError: null
    });

    // feedSlice
    expect(state.feed).toEqual({
      feedData: null,
      isLoading: false,
      error: null
    });

    // userOrdersSlice
    expect(state.userOrders).toEqual({
      orders: [],
      isLoading: false,
      error: null
    });
  });
});
