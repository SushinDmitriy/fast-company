/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import API from "../API";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
    const [user, setUser] = useState({});

    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        API.users.getById(userId).then((data) => {
            if (typeof data !== "undefined") {
                setUser(data);
            }
        });
    }, []);

    const handleReturnUsers = () => {
        history.push("/users");
    };

    return JSON.stringify(user) !== "{}" ? (
        <div className="m-3">
            <h1>{`Name: ${user.name}`}</h1>
            <h2>{`Profession: ${user.profession.name}`}</h2>
            <QualitiesList qualities={user.qualities} />
            <h3>{`Completed meetings: ${user.completedMeetings}`}</h3>
            <h4>{`Rate: ${user.rate}/5`}</h4>
            <button
                className="btn btn-outline-primary"
                onClick={() => {
                    handleReturnUsers();
                }}
            >
                Пользователи
            </button>
        </div>
    ) : (
        "Loading ..."
    );
};

export default UserPage;
