import React from 'react';
import EarthRotate from './ui/EarthRotate';

const Home = () => {
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <EarthRotate />
      <div style={{ color: "green", textAlign: "center" }}>
        <span>This Countries App </span>is a simple React application made in
        Business College Helsinki as an assignment. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </div>
    </div>
  );
};

export default Home;
