import React from "react";
import styled, { keyframes } from "styled-components";
import Earth from './Earth.png';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingEarth = styled.img`
  animation: ${rotate} 40s linear infinite;
`;

const EarthRotate = () => {
  return (
    <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <RotatingEarth
        style={{ width: "500px", height: "500px" }}
        src={Earth}
        alt="Earth"
      />
    </div>
  );
};

export default EarthRotate;











