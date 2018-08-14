import React from "react";
import Tilt from "react-tilt";
import user from "./ai.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="ma4">
      <Tilt
        className="Tilt br-2 shadow-2"
        options={{ max: 60 }}
        style={{ height: 155, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          {" "}
          <img src={user} alt="logo" />{" "}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
