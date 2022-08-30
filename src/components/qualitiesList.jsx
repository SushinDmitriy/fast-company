import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualitie) => {
                return <Qualitie qualitie={qualitie} key={qualitie.name} />;
            })}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
