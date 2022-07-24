import React from "react";

const BookMark = ({ onToggleBookMark, userId, user }) => {
  const handleToggleBookMark = () => {
    onToggleBookMark(userId);
  };
  return (
    <button className="btn" onClick={handleToggleBookMark}>
      <i className={`bi bi-bookmark${user.bookmark ? "-fill" : ""}`}></i>
    </button>
  );
};

export default BookMark;
