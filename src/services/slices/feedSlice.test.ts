import feedReducer, { fetchFeeds, clearFeedError } from './feedSlice';
import { TOrdersData } from '@utils-types';

const mockFeedData: TOrdersData = {
  orders: [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-10-19T12:00:00.000Z',
      updatedAt: '2023-10-19T12:00:00.000Z',
      number: 1001
    }
  ],
  total: 100,
  totalToday: 10
};

describe('feedSlice reducer', () => {
  const initialState = {
    feedData: null,
    isLoading: false,
    error: null
  };

  it('fetchFeeds pending: устанавливает isLoading в true', () => {
    const state = feedReducer(initialState, {
      type: fetchFeeds.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchFeeds fulfilled: сохраняет feedData и выключает loading', () => {
    const state = feedReducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedData
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.feedData).toEqual(mockFeedData);
  });

  it('fetchFeeds rejected: сохраняет ошибку и выключает loading', () => {
    const state = feedReducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.feedData).toBeNull();
  });

  it('clearFeedError: очищает только ошибку', () => {
    const stateWithError = {
      feedData: null,
      isLoading: false,
      error: 'Ошибка загрузки'
    };
    const state = feedReducer(stateWithError, clearFeedError());
    expect(state.error).toBeNull();
    expect(state.feedData).toBeNull();
  });
});
