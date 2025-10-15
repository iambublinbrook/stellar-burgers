import { Root } from 'react-dom/client';
import { RootState } from './store';

export const selectConstructorItems = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

export const selectIsAuthChecked = (state: RootState): boolean =>
  state.user.isInit;
export const selectIsUserAuthenticated = (state: RootState): boolean =>
  state.user.user !== null;
export const selectUser = (state: RootState) => state.user.user;
export const selectAuthLoading = (state: RootState) => state.user.isLoading;
export const selectAuthError = (state: RootState) => state.user.error;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectOrderError = (state: RootState) => state.order.orderError;
export const selectUserOrders = (state: RootState) => state.userOrders.orders;
export const secectUserOrdersLoading = (state: RootState) =>
  state.userOrders.isLoading;

export const selectFeedOrders = (state: RootState) =>
  state.feed.feedData?.orders || [];
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeedTotal = (state: RootState) =>
  state.feed.feedData?.total || [];
export const selectFeedTotalToday = (state: RootState) =>
  state.feed.feedData?.totalToday || 0;
