import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/utils/interceptors';
// import setupApiInterceptor from 'src/utils/interceptors';
//-----------------------------------------------------------------------
export const allUsers = createAsyncThunk('user/allUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await setupApiInterceptor('/users', 'GET');
    console.log('data', response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
