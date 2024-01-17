import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//-----------------------------------------------------------------------

export const allUsers = createAsyncThunk('user/allUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://api.enxsis.com/api/v1/users');

    console.log('data', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
