import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './UserContext';
import API from '../api';

const ShowsContext = React.createContext();

export const useShows = () => {
  return useContext(ShowsContext);
};

export const ShowsContextProvider = ({ children }) => {
  const shows = useMoviesData();
  return (
    <ShowsContext.Provider value={shows}>{children}</ShowsContext.Provider>
  );
};

function useMoviesData() {
  const [allShows, setAllShows] = useState([]);
  const { authDetails } = useAuth();
  const getAllGenres = () => {
    const genres = [...new Set(allShows.map((show) => show.genres).flat(1))];
    return genres;
  };

  const getAllShows = useCallback(async () => {
    try {
      const token = authDetails.token;
      const response = await API.get('/all-movies', {
        headers: { Authorization: `Barer ${token}` },
      });

      setAllShows(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAllShows, authDetails.token]);

  useEffect(() => {
    getAllShows();
  }, [getAllShows]);

  return {
    allShows,
    setAllShows,
    getAllGenres,
    getAllShows,
  };
}
