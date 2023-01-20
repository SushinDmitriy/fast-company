import React from "react";
import PropTypes from "prop-types";

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
BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
export default BookMark;
