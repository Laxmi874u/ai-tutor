import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  return(
    <div style={styles.container}>
      <Navbar />
      <Header />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'url("/bg_img.png") no-repeat center center fixed',
    backgroundSize: 'cover',
  }
}

export default Home;
