import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").split("");
    paste.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <img onClick={() => navigate("/")} src={assets.logo} alt="Logo" style={styles.logo} />

      <div style={styles.formsContainer}>
        {/* Email Form */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} style={styles.form}>
            <h1 style={styles.heading}>Reset Password</h1>
            <p style={styles.subtext}>Enter your registered email</p>
            <div style={styles.inputGroup}>
              <img src={assets.mail_icon} alt="Email Icon" style={styles.icon} />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        )}

        {/* OTP Input Form */}
        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={onSubmitOTP} style={styles.form}>
            <h1 style={styles.heading}>Reset Password OTP</h1>
            <p style={styles.subtext}>Enter the 6-digit code sent to your email</p>
            <div style={styles.otpContainer} onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={styles.otpInput}
                  />
                ))}
            </div>
            <button type="submit" style={styles.button}>Verify</button>
          </form>
        )}

        {/* New Password Form */}
        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} style={styles.form}>
            <h1 style={styles.heading}>New Password</h1>
            <p style={styles.subtext}>Enter the new password below</p>
            <div style={styles.inputGroup}>
              <img src={assets.lock_icon} alt="Lock Icon" style={styles.icon} />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "20px",
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "120px",
    cursor: "pointer",
  },
  formsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: "50px",
  },
  form: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "white",
    textAlign: "center",
    width: "280px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtext: {
    fontSize: "14px",
    color: "#b3c0f3",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    background: "#333a5c",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  icon: {
    width: "20px",
    marginRight: "10px",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    flexGrow: "1",
  },
  otpContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  otpInput: {
    width: "35px",
    height: "35px",
    textAlign: "center",
    fontSize: "18px",
    background: "#333a5c",
    color: "white",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default ResetPassword;
