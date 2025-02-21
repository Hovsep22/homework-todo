/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, setPage, setSearch } from "../features/users/userSlice";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, page, totalPages, loading, error,searchText } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({
      page,
      searchText
    }));
  }, [dispatch, page,searchText]);

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
      <input type="text" value={searchText} onChange={(e)=>dispatch(setSearch(e.target.value))}/>
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
