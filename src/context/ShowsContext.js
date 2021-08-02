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
  const [allGenres, setAllGenres] = useState([]);
  const { authDetails } = useAuth();

  const getAllShows = useCallback(async () => {
    try {
      const token = authDetails.token;
      const response = await API.get('/all-movies', {
        headers: { Authorization: `Barer ${token}` },
      });

      setAllShows(response.data);
      const genres = [
        ...new Set(response.data.map((show) => show.genres).flat(1)),
      ];
      setAllGenres(genres);
    } catch (error) {
      console.log(error);
    }
  }, [setAllShows, authDetails.token]);

  const addNewShow = async (data) => {
    try {
      const response = await API.post('/add-movie', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllShows();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };

  const editShow = async (data) => {
    try {
      const response = await API.post('/edit-movie', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllShows();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShow = async (showId) => {
    try {
      const response = await API.delete(`delete-movie/${showId}`, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllShows();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getShowById = (showId) => {
    const shows = allShows.find((show) => show._id === showId);
    return shows;
  };

  useEffect(() => {
    getAllShows();
  }, [getAllShows]);

  return {
    allShows,
    setAllShows,
    allGenres,
    addNewShow,
    editShow,
    deleteShow,
    getShowById,
  };
}
