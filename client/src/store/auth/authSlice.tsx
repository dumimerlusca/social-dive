import { createSlice } from '@reduxjs/toolkit';
import IUser from 'interfaces/IUser';

const token = localStorage.getItem('token');

type initialStateType = {
  isLoggedIn: boolean;
  currentUser: IUser;
  isLoading: boolean;
  token: string | null;
  registerSuccess: boolean | null;
  error: string | null;
  loadUserLoading: boolean;
};

const initialState: initialStateType = {
  isLoggedIn: false,
  currentUser: null as unknown as IUser,
  isLoading: false,
  token: token,
  registerSuccess: null,
  error: null,
  loadUserLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authLoading: (state) => {
      state.isLoading = true;
    },
    loginSucces: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
    },
    errorReset: (state) => {
      state.error = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerSucces: (state, action) => {
      state.isLoading = false;
      state.registerSuccess = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
    },
    registerReset: (state) => {
      state.error = null;
      state.registerSuccess = null;
    },
    loadUserLoading: (state) => {
      state.loadUserLoading = true;
    },
    loadUserSucces: (state, action) => {
      state.loadUserLoading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loadUserLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    authReset: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null as unknown as IUser;
      state.loadUserLoading = true;
      state.error = null;
      state.token = null;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  authLoading,
  loginSucces,
  registerSucces,
  registerReset,
  authError,
  errorReset,
  loadUserSucces,
  authReset,
  loadUserLoading,
  loadUserFail,
  updateCurrentUser,
} = authSlice.actions;

const authSliceReducer = authSlice.reducer;

export default authSliceReducer;
