import userOrdersReducer, { fetchUserOrders } from './userOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Бургер 1',
    createdAt: '2023-10-19T12:00:00.000Z',
    updatedAt: '2023-10-19T12:00:00.000Z',
    number: 1001
  },
  {
    _id: '2',
    ingredients: ['3'],
    status: 'pending',
    name: 'Бургер 2',
    createdAt: '2023-10-19T13:00:00.000Z',
    updatedAt: '2023-10-19T13:00:00.000Z',
    number: 1002
  }
];

describe('userOrdersSlice reducer', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('fetchUserOrders pending: устанавливает isLoading в true', () => {
    const state = userOrdersReducer(initialState, {
      type: fetchUserOrders.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchUserOrders fulfilled: сохраняет заказы и выключает loading', () => {
    const state = userOrdersReducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('fetchUserOrders rejected: сохраняет ошибку и выключает loading', () => {
    const state = userOrdersReducer(initialState, {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
