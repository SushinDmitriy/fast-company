import React from "react";
import Qualite from "./quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleBookMark }) => {
    const handleDelete = () => {
        onDelete(user);
    };

    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qualite) => {
                    return <Qualite qualite={qualite} key={qualite._id} />;
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    userId={user._id}
                    user={user}
                />
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Удалить
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default User;
