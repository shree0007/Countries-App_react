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
    <div style={{ height: "450px", display: "flex" }}>
      <RotatingEarth
        style={{ width: "420px", height: "420px" }}
        src={Earth}
        alt="Earth"
      />
    </div>
  );
};

export default EarthRotate;











