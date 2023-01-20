import React from "react";
import PropTypes from "prop-types";

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
                <span className="badge bg-primary p-2 m-2">
                    {length > 0
                        ? renderPhrase()
                        : "Никто не тусанет с тобой сегодня"}
                </span>
            </h2>
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
