import { describe, expect, test, beforeEach } from '@jest/globals';
import profileReducer, {
  getUser,
  logout,
  update,
  initialState
} from './profile';
import { login } from '../login/login';
import { register } from '../register/register';

describe('profileSlice reducer', () => {
  beforeEach(() => {
    if (!global.localStorage) {
      global.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      } as any;
    }

    if (!global.document) {
      global.document = {} as any;
    }
  });

  const mockUser = { email: '', name: '', password: '' };
  const loginData = { email: '', password: '' };

  const mockUserResponse = {
    success: true,
    user: mockUser
  };

  const mockUserData = {
    success: true,
    user: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword' // Добавляем поле password для совместимости с типом TUser
    },
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  };

  const registerData = { email: '', name: '', password: '' };

  test('should handle getUser.pending', () => {
    const nextState = profileReducer(
      initialState,
      getUser.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('should handle getUser.fulfilled', () => {
    const nextState = profileReducer(
      initialState,
      getUser.fulfilled(mockUserResponse, '', undefined)
    );
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle getUser.rejected', () => {
    const nextState = profileReducer(
      initialState,
      getUser.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle register.pending', () => {
    const nextState = profileReducer(
      initialState,
      register.pending('', registerData)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('should handle register.fulfilled', () => {
    const nextState = profileReducer(
      initialState,
      register.fulfilled(mockUserData, '', registerData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle register.rejected', () => {
    const nextState = profileReducer(
      initialState,
      register.rejected(null, '', registerData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle logout.pending', () => {
    const nextState = profileReducer(
      initialState,
      logout.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('should handle logout.fulfilled', () => {
    const userState = { isLoading: true, user: mockUser };
    const nextState = profileReducer(
      userState,
      logout.fulfilled(mockUserResponse, '', undefined)
    );
    expect(nextState.user).toEqual(null);
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle logout.rejected', () => {
    const nextState = profileReducer(
      initialState,
      logout.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle login.pending', () => {
    const nextState = profileReducer(
      initialState,
      login.pending('', loginData, undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('should handle login.fulfilled', () => {
    const nextState = profileReducer(
      initialState,
      login.fulfilled(mockUserData, '', loginData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle login.rejected', () => {
    const nextState = profileReducer(
      initialState,
      login.rejected(null, '', loginData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle update.pending', () => {
    const nextState = profileReducer(
      initialState,
      update.pending('', loginData, undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('should handle update.fulfilled', () => {
    const nextState = profileReducer(
      initialState,
      update.fulfilled(mockUserData, '', loginData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('should handle update.rejected', () => {
    const nextState = profileReducer(
      initialState,
      update.rejected(null, '', loginData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });
});
