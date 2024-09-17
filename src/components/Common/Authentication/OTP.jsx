// src/components/OTP.js

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser, signUp } from "../../../redux/features/authSlice";
import axios from "../../../fetchData/axios";

const OTP = (props) => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { phoneNumber, password } = location.state;
  const { phoneNumber, password, firstName, lastName, address, email, roleCode, image } = location.state;
  const handleOTPSubmit = async () => {
    if (!window.confirmationResult) {
      console.error("No confirmation result available.");
      return;
    }

    try {
      // Verify OTP
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      // On successful OTP verification, dispatch to Redux
      dispatch(signUp({ phoneNumber, password, firstName, lastName, address, email, roleCode, image }))
      .unwrap()
      .then(() => {
        // Điều hướng sau khi thành công, nếu cần
        console.log("Sign Up Successful", );
        console.log("image", image);
        navigate("/");
      })
      .catch((error) => {
        console.log("image", image);
        console.error("Sign Up Error:", error);
      });

      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Failed to verify OTP: ", error.message);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleOTPSubmit}>Verify OTP</button>
    </div>
  );
};

export default OTP;
