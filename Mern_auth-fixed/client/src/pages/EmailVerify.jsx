import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').split('');
    paste.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((e) => e.value).join('');
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div style={styles.container}>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        style={styles.logo}
      />
      <form onSubmit={onSubmitHandler} style={styles.form}>
        <h1 style={styles.heading}>Email Verify OTP</h1>
        <p style={styles.text}>Enter the 6-digit code sent to your email ID.</p>
        <div style={styles.otpContainer} onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              style={styles.otpInput}
              ref={(el) => (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button type="submit" style={styles.button}>Verify Email</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #a2d2ff, #d9a7c7)',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    width: '100px',
    cursor: 'pointer',
  },
  form: {
    backgroundColor: '#1e293b',
    padding: '32px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '350px',
  },
  heading: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    color: '#a5b4fc',
    marginBottom: '20px',
    fontSize: '14px',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    fontSize: '18px',
    textAlign: 'center',
    backgroundColor: '#333A5C',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    background: 'linear-gradient(to right, #6366F1, #312E81)',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default EmailVerify;
