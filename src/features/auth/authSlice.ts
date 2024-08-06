import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  id: string | null;
  nombre: string | null;
  apellido: string | null;
  correo: string | null;
  telefono: string | null;
  fecha_nacimiento: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  id: null,
  nombre: null,
  apellido: null,
  correo: null,
  telefono: null,
  fecha_nacimiento: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.correo = action.payload.correo;
      state.telefono = action.payload.telefono;
      state.fecha_nacimiento = action.payload.fecha_nacimiento;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.id = null;
      state.nombre = null;
      state.apellido = null;
      state.correo = null;
      state.telefono = null;
      state.fecha_nacimiento = null;
    },
    resetUserState: () => initialState,
  },
});

export const {login, logout, resetUserState} = authSlice.actions;
export default authSlice.reducer;
