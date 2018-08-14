import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`welcome ${name}`}</div>
      <div className="white f1">{`you are rank ${entries}`}</div>
    </div>
  );
};

export default Rank;
