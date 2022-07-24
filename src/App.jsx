import React, { useState } from "react";
import API from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user !== userId);
    setUsers(newUsers);
  };
  const handleToggleBookMark = (userId) => {
    const updatedState = [...users];
    const userBookMark = updatedState.find((user) => user._id === userId);
    userBookMark.bookmark = !userBookMark.bookmark;
    setUsers(updatedState);
  };

  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger p-2 m-2">
          Никто не тусанет с тобой сегодня
        </span>
      </h2>
    );
  }
  return (
    <>
      <SearchStatus length={users.length} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>
          <Users
            users={users}
            onDelete={handleDelete}
            onToggleBookMark={handleToggleBookMark}
          />
        </tbody>
      </table>
    </>
  );
};

export default App;
