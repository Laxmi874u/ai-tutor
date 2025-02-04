import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try{
      axios.defaults.withCredentials=true;

      const {data} = await axios.post(backendUrl + 'api/auth/send-verify-otp')

      if(data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch(error) {
      toast.error(error.message)

    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={styles.navbar}>
      <img src={assets.logo} alt="Logo" style={styles.logo} />

      {userData ? (
        <div
          style={styles.userContainer}
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <div style={styles.userIcon}>{userData.name[0].toUpperCase()}</div>
          {dropdownVisible && (
            <div style={styles.dropdownMenu}>
              {!userData.isAccountVerified && (
                <div onClick={sendVerificationOtp} style={styles.dropdownItem}>Verify Email</div>
              )}
              <div onClick={logout} style={styles.dropdownItem}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          style={isHovered ? styles.buttonHovered : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow Icon" style={styles.arrowIcon} />
        </button>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    position: 'absolute',
    top: '0',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    width: '8rem',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #808080',
    borderRadius: '9999px',
    padding: '0.5rem 1.5rem',
    color: '#4B5563',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHovered: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #808080',
    borderRadius: '9999px',
    padding: '0.5rem 1.5rem',
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  arrowIcon: {
    width: '16px',
    height: '16px',
  },
  userContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  userIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    zIndex: 10,
    minWidth: '120px',
  },
  dropdownItem: {
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'white',
  },
};

export default Navbar;
