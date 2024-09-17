import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../utils/firebase';

export const sendOtp = createAsyncThunk(
  'otp/sendOtp',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      return confirmationResult;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    confirmationResult: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.confirmationResult = action.payload;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// export const { } = otpSlice.actions;

export default otpSlice.reducer;
