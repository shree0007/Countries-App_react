import React from 'react';
import EarthRotate from './ui/EarthRotate';
import hello_image from './ui/hello.png';


const Home = () => {
  return (
    <div style={{ backgroundColor: "#191919", minHeight: "70vh", maxWidth: "100vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10rem" }}>
      <EarthRotate />
      <img className='h-40' src={hello_image} alt="hello" /><br />
      <div style={{ color: "#308454", textAlign: "center", width: "420px", padding: "1rem" }}>
        <h4>Hello there ! </h4> <br />
        <p> "Welcome to Countries App, your passport to the world! Explore the diverse nations, uncovering their capitals, languages, currencies, populations, weather conditions, and many more all in the palm of your hand."</p>

      </div>
    </div>
  );
};

export default Home;
