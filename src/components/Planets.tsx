/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPlanets, setPage } from "../features/planets/planetSlice";

const Planets: React.FC = () => {
  const dispatch = useAppDispatch();
  const { planets, page, totalPages, loading, error } = useAppSelector(
    (state) => state.planets
  );

  
  useEffect(() => {
    dispatch(fetchPlanets(page));
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
      <h1>Planets</h1>
      <div>
        {planets.map((planet: any) => (
          <div key={planet.name} className="user-card">
            <h3>{planet.name}</h3>
            <p>Height: {planet.terrain}</p>
            <p>population: {planet.population}</p>
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

export default Planets;
