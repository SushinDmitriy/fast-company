import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = () => {
    if (length === 1 || length >= 5) {
      return `${length} человек тусанёт с тобой сегодня`;
    } else if (length <= 4 && length !== 0) {
      return `${length} человека тусанут с тобой сегодня`;
    }
  };

  return (
    <>
      <h2>
        <span className="badge bg-primary">{renderPhrase()}</span>
      </h2>
    </>
  );
};

export default SearchStatus;
