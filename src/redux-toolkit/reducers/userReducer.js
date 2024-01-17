import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allUsers } from '../actions/userActions';

const initialState = {
  loading: false,
  users: [],
  //   success: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //   clearErrors: (state) => {
    //     state.error = null;
    //   },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
