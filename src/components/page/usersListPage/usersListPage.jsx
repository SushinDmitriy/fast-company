import React, { useState, useEffect } from "react";
import API from "../../../API";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagitane";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import PropTypes from "prop-types";
import _ from "lodash";

const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuerry, setSearchQuerry] = useState("");

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuerry]);
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const pageSize = 6;
    const handleProfessionSelect = (item) => {
        if (searchQuerry !== "") setSearchQuerry("");
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

    const handleSearchQuerry = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuerry(target.value);
    };

    if (users) {
        const filteredUsers = searchQuerry
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuerry.toLowerCase()) !== -1
              )
            : selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                    <input
                        type="text"
                        name="searchQuerry"
                        placeholder="Search..."
                        onChange={handleSearchQuerry}
                        value={searchQuerry}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            selectedSort={sortBy}
                        />
                    )}

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

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
