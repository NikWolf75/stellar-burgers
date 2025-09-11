import { describe, expect, test } from '@jest/globals';
import registerSlice, { register, initialState } from './register';

describe('registerSlice reducer', () => {
  const registerData = { email: '', name: '', password: '' };

  test('должен обработать registerSlice.pending', () => {
    const nextState = registerSlice.reducer(
      initialState,
      register.pending('', registerData)
    );
    expect(nextState.isError).toBe(false);
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать registerSlice.rejected', () => {
    const nextState = registerSlice.reducer(
      initialState,
      register.rejected(null, '', registerData, 'Ошибка загрузки')
    );
    expect(nextState.isError).toBe(true);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать registerSlice.fulfilled', () => {
    const mockResponse = {
      success: true,
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: { name: 'Test', email: 'test@mail.com' }
    };
    const nextState = registerSlice.reducer(
      initialState,
      register.fulfilled(mockResponse, '', registerData)
    );
    expect(nextState.user).toEqual(mockResponse.user);
    expect(nextState.isLoading).toBe(false);
  });
});
