import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import api from '../../api/client';



const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  success: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginStart: state => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    LoginFailed: (state, action) => {
      state.loading = true;
      state = null;
      state.error = action.payload;
    },

    LogOut: state => {
      return {...state, userInfo: null};
    },
  },
  

});
export const {LoginStart, LoginSuccess, LoginFailed, LogOut} =
  userSlice.actions;

export default userSlice.reducer;
