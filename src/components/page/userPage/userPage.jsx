/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";
import QualitiesList from "../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    });
    const handleReturnUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div className="m-3">
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h3>Completed meetings: {user.completedMeetings}</h3>
                <h4>Rate: {user.rate}/5</h4>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                        handleReturnUsers();
                    }}
                >
                    Все пользователи
                </button>
            </div>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
