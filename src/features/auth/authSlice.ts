import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: true,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = null;
    },
    resetUserSate: () => initialState,
  },
});

export const {login, logout, setToken, clearToken} = authSlice.actions;
export default authSlice.reducer;
