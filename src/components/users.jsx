import React, { useState, useEffect } from "react";
import API from "../API";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/pagitane";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const pageSize = 4;
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (userId) => {
        const updateUsers = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }

            return user;
        });

        setUsers(updateUsers);
    };

    const handePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                        selectedSort={sortBy}
                    />

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
    }
    return "loading...";
};

export default Users;
