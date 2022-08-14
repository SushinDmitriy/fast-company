import React, { useState, useEffect } from "react";
import API from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagination";
import { paginate } from "./utils/pagitane";
import GroupList from "./components/groupList";

const App = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 3;
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (userId) => {
        const updatedState = [...users];
        const userBookMark = updatedState.find((user) => user._id === userId);
        userBookMark.bookmark = !userBookMark.bookmark;
        setUsers(updatedState);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    if (count === 0) {
        return (
            <h2>
                <span className="badge bg-danger p-2 m-2">
                    Никто не тусанет с тобой сегодня
                </span>
            </h2>
        );
    }
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-srink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondsry mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
