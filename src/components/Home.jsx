import React from 'react';
import EarthRotate from './ui/EarthRotate';
import hello_image from './ui/hello.png';


const Home = () => {
  return (
    <div style={{ backgroundColor: "#191919", minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10rem" }}>
      <EarthRotate />
      <div style={{ color: "#308454", textAlign: "center", width: "900px", padding: "1rem" }}>
        <h4>Hello there ! <img src={hello_image} alt="hello" /></h4> <br />
        <p> "Welcome to Countries App, your passport to the world! Explore the diverse nations, uncovering their capitals, languages, currencies, populations, weather conditions, and many more all in the palm of your hand."</p>

      </div>
    </div>
  );
};

export default Home;
