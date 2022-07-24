import React from "react";

const Qualite = ({ qualite }) => {
  return (
    <span key={qualite.name} className={`badge bg-${qualite.color} m-1`}>
      {qualite.name}
    </span>
  );
};

export default Qualite;
