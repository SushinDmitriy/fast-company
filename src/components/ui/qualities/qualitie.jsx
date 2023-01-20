import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ qualitie }) => {
    return (
        <span key={qualitie.name} className={`badge bg-${qualitie.color} m-1`}>
            {qualitie.name}
        </span>
    );
};

Qualitie.propTypes = {
    qualitie: PropTypes.object.isRequired
};
export default Qualitie;
