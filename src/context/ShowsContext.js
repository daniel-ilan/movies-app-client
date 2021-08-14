import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './UserContext';
import API from '../api';

function sortShowsByName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

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
  const [initShows, setInitShows] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const { authDetails } = useAuth();

  const getAllShows = useCallback(async () => {
    try {
      const token = authDetails.token;
      const response = await API.get('/all-movies', {
        headers: { Authorization: `Barer ${token}` },
      });

      setInitShows(response.data);
      const genres = [
        ...new Set(response.data.map((show) => show.genres).flat(1)),
      ];
      setAllGenres(genres);
    } catch (error) {
      console.log(error);
    }
  }, [setInitShows, authDetails.token]);

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
    const shows = initShows.find((show) => show._id === showId);
    return shows;
  };

  const filterShows = (text, genres) => {
    let allShows = Array.from(initShows);
    if (text) {
      allShows = filterShowsByName(text, allShows);
    }
    if (genres) {
      allShows = filterShowsByGenre(genres, allShows);
    }
    setFilteredShows(allShows);
  };

  const filterShowsByName = (text, shows) => {
    const newShows = shows.filter((show) =>
      show.name.toLowerCase().includes(text.toLowerCase()),
    );
    newShows.sort(sortShowsByName);
    return newShows;
  };

  const filterShowsByGenre = (genre, shows) => {
    const newShows = shows.filter((show) => {
      return genre.every((v) => show.genres.includes(v));
    });
    newShows.sort(sortShowsByName);
    return newShows;
  };

  useEffect(() => {
    getAllShows();
  }, [getAllShows]);

  useEffect(() => {
    if (initShows.length > 0) {
      initShows.sort(sortShowsByName);
      setFilteredShows(initShows);
    }
  }, [initShows]);

  return {
    filterShows,
    filteredShows,
    setFilteredShows,
    allGenres,
    addNewShow,
    editShow,
    deleteShow,
    getShowById,
    initShows,
  };
}
