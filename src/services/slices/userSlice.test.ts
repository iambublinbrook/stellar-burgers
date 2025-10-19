import userReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  forgotPassword,
  resetPassword,
  init,
  logout,
  clearError
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'user@example.com',
  name: 'Космический Котик'
};

describe('userSlice reducer', () => {
  const initialState = {
    user: null,
    isInit: false,
    isLoading: false,
    error: null
  };

  it('checkUserAuth pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('checkUserAuth fulfilled: сохраняет пользователя, isInit = true', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    });
    expect(state.isLoading).toBe(false);
    expect(state.isInit).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  it('checkUserAuth rejected: очищает пользователя, сохраняет ошибку', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.rejected.type,
      payload: 'Ошибка авторизации'
    });
    expect(state.isLoading).toBe(false);
    expect(state.isInit).toBe(true);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('loginUser pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: loginUser.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('loginUser fulfilled: сохраняет пользователя', () => {
    const state = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  it('loginUser rejected: сохраняет ошибку', () => {
    const state = userReducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Неверный email или пароль'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Неверный email или пароль');
  });

  //registerUser аналогично login
  it('registerUser pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: registerUser.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('registerUser fulfilled: сохраняет пользователя', () => {
    const state = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
  });

  it('registerUser rejected: сохраняет ошибку', () => {
    const state = userReducer(initialState, {
      type: registerUser.rejected.type,
      payload: 'Пользователь уже существует'
    });
    expect(state.error).toBe('Пользователь уже существует');
  });

  it('logoutUser fulfilled: очищает пользователя', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isInit: true
    };
    const state = userReducer(stateWithUser, {
      type: logoutUser.fulfilled.type
    });
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });

  it('logoutUser rejected: сохраняет ошибку', () => {
    const state = userReducer(initialState, {
      type: logoutUser.rejected.type,
      payload: 'Ошибка выхода'
    });
    expect(state.error).toBe('Ошибка выхода');
  });

  it('updateUser pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: updateUser.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('updateUser fulfilled: обновляет пользователя', () => {
    const updatedUser = { ...mockUser, name: 'Обновлённый Космичский Котик' };
    const state = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });
    expect(state.user).toEqual(updatedUser);
  });

  it('forgotPassword pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: forgotPassword.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('forgotPassword fulfilled: сбрасывает loading и ошибку', () => {
    const state = userReducer(initialState, {
      type: forgotPassword.fulfilled.type
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('resetPassword pending: isLoading = true', () => {
    const state = userReducer(initialState, {
      type: resetPassword.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('init: устанавливает isInit = true, сбрасывает user и error', () => {
    const stateWithError = {
      user: mockUser,
      isInit: false,
      isLoading: false,
      error: 'Ошибка'
    };
    const state = userReducer(stateWithError, init());
    expect(state.isInit).toBe(true);
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });

  it('logout: очищает пользователя и устанавливает isInit = true', () => {
    const stateWithUser = {
      user: mockUser,
      isInit: false,
      isLoading: false,
      error: null
    };
    const state = userReducer(stateWithUser, logout());
    expect(state.user).toBeNull();
    expect(state.isInit).toBe(true);
    expect(state.error).toBeNull();
  });

  it('clearError: очищает только ошибку', () => {
    const stateWithError = {
      ...initialState,
      error: 'Ошибка'
    };
    const state = userReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
  });
});
