import React from "react";
import PropTypes from "prop-types";

const Qualite = ({ qualite }) => {
    return (
        <span key={qualite.name} className={`badge bg-${qualite.color} m-1`}>
            {qualite.name}
        </span>
    );
};

Qualite.propTypes = {
    qualite: PropTypes.object.isRequired
};
export default Qualite;
