import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../fetchData/axios';

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

// Login vs google
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (tokenFromUrl, { rejectWithValue }) => {
    try {
      // Gửi yêu cầu đến backend để xác thực token từ Google và lấy thông tin người dùng
      const response = await axios.get('/auth/google/callback', {
        headers: { Authorization: `Bearer ${tokenFromUrl}` }
      });
      
      if (response && response.data) {
        const { user } = response.data.user;
        const { token } = response.data.token;
        return {
          user: user,
          token: token, // Sử dụng token từ Google
        };
      } else {
        return rejectWithValue('No response data received from server');
      }
    } catch (error) {
      console.error('Error occurred during Google login:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: { // Các reducer đồng bộ
    logout: (state) => {
      state.user = null;
      state.token = null;
       // Xóa thông tin khỏi localStorage khi đăng xuất
       localStorage.removeItem('user');
       localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
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
         // Lưu thông tin user và token vào localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => { // Khi thất bại
        state.status = 'failed';
        state.error = action.payload;
      })
       // Xử lý login với Google
       .addCase(loginWithGoogle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout,setToken } = authSlice.actions;

export default authSlice.reducer;
