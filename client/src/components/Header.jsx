import React, { useContext } from 'react';
import { assets } from '../assets/assets.js'; // Ensure assets are correctly imported
import { AppContent } from '../context/AppContext.jsx';

const Header = () => {
  const { userData } = useContext(AppContent); // Correct useContext usage

  return (
    <div style={styles.headerContainer}>
      <img src={assets.header_img} alt="Header" style={styles.image} />
      <h1 style={styles.heading}>
        Hey {userData ? userData.name : 'Developer'} !
        <img src={assets.hand_wave} alt="Wave" style={styles.waveImage} />
      </h1>
      <h2 style={styles.subHeading}>Welcome to our app</h2>
      <p style={styles.paragraph}>
        Let's start with a quick product tour, and we will have you up and running in no time!
      </p>
      <button style={styles.button}>Get Started</button>
    </div>
  );
};

const styles = {
  headerContainer: {
    textAlign: 'center',
    padding: '2rem', // Ensure some padding
  },
  image: {
    width: '9rem',
    height: '9rem',
    borderRadius: '50%',
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#333',
  },
  waveImage: {
    width: '2rem',
    height: '2rem',
    objectFit: 'contain',
    verticalAlign: 'middle',
  },
  subHeading: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  paragraph: {
    marginBottom: '2rem',
    maxWidth: '28rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    border: '1px solid #6b7280',
    borderRadius: '9999px',
    padding: '0.625rem 2rem',
    cursor: 'pointer', // Added to make button clickable
    backgroundColor: '#f3f4f6', // Default light gray
    transition: 'background-color 0.3s ease',
  },
};

export default Header;
