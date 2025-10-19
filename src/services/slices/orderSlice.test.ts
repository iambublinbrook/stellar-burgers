import orderReducer, {
  createOrder,
  getOrderByNumber,
  clearOrder,
  clearOrderError
} from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '60d3b41abdacab0026a733c6',
  ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c8'],
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2023-10-19T12:00:00.000Z',
  updatedAt: '2023-10-19T12:00:00.000Z',
  number: 12345
};

describe('orderSlice reducer', () => {
  const initialState = {
    orderModalData: null,
    orderRequest: false,
    orderError: null
  };

  it('устанавливает orderRequest в true при pending', () => {
    const state = orderReducer(initialState, {
      type: createOrder.pending.type
    });
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('сохраняет заказ и выключает loading', () => {
    const state = orderReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBeNull();
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('сохраняет ошибку и выключает loading', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = orderReducer(initialState, {
      type: createOrder.rejected.type,
      payload: errorMessage
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
  });

  it('устанавливает orderRequest в true', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('сохраняет заказ', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    });
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  it('сохраняет ошибку', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type,
      payload: 'Заказ не найден'
    });
    expect(state.orderError).toBe('Заказ не найден');
    expect(state.orderRequest).toBe(false);
  });

  it('clearOrder: очищает данные заказа и ошибку', () => {
    const stateWithError = {
      orderModalData: mockOrder,
      orderRequest: false,
      orderError: 'Ошибка'
    };
    const state = orderReducer(stateWithError, clearOrder());
    expect(state.orderModalData).toBeNull();
    expect(state.orderError).toBeNull();
  });

  it('clearOrderError: очищает только ошибку', () => {
    const stateWithError = {
      orderModalData: mockOrder,
      orderRequest: false,
      orderError: 'Ошибка'
    };
    const state = orderReducer(stateWithError, clearOrderError());
    expect(state.orderError).toBeNull();
    expect(state.orderModalData).toEqual(mockOrder); // не трогаем данные
  });
});
