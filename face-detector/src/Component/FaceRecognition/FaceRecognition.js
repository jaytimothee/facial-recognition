import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ url, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="input_img"
          src={url}
          alt="clarifi"
          width="500px"
          height="auto"
        />
      
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
        }}
      />
      </div>
    </div>
  );
};
export default FaceRecognition;