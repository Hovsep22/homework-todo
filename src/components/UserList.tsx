/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, setPage } from "../features/users/userSlice";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, page, totalPages, loading, error } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <div className="users">
      <h1>Users</h1>
      <div>
        {users.map((user: any) => (
          <div key={user.name} className="user-card">
            <h3>{user.name}</h3>
            <p>Height: {user.height}</p>
            <p>Mass: {user.mass}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default UserList;
