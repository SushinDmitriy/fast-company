import React from "react";
import { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user !== id);
    setUsers(newUsers);
    //setUsers((prevState) => prevState.filter((user) => user != id));
  };
  let classes = "badge ";
  classes += users.length === 0 ? "bg-danger" : "bg-primary";
  const renderPhrase = () => {
    if (users.length === 1 || users.length >= 5) {
      return `${users.length} человек тусанёт с тобой сегодня`;
    } else if (users.length <= 4 && users.length !== 0) {
      return `${users.length} человека тусанут с тобой сегодня`;
    }
  };

  if (users.length === 0) {
    return (
      <h2>
        <span className={classes}>Никто не тусанет с тобой сегодня</span>
      </h2>
    );
  }

  return (
    <>
      <h2>
        <span className={classes}>{renderPhrase()} </span>
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <span
                    key={quality.name}
                    className={`badge bg-${quality.color} m-1`}
                  >
                    {quality.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
