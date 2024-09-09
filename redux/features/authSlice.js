import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../src/fetchData/axios';

// Async Thunk để xử lý login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      console.log('Login response:', response);
      if (response && response.data) {
        const { data } = response;
        return {
          user: data.data, 
          token: data.token,
        };
      } else {
        // If response or response.data is not defined, return a meaningful error
        return rejectWithValue('No response data received from server');
      }
    } catch (error) {
      console.error("Error occurred during login:", error); // Debugging log

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return the API error response
      } else if (error.message) {
        return rejectWithValue(error.message); // Return the error message if it exists
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: { // Các reducer đồng bộ
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {  // Xử lý các reducer bất đồng bộ (từ createAsyncThunk)
    builder
      .addCase(login.pending, (state) => {  // Khi đang thực hiện
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => { // Khi thành công
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null; 
      })
      .addCase(login.rejected, (state, action) => { // Khi thất bại
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
