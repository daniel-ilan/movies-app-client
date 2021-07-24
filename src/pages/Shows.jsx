import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AllShows from '../components/Shows/AllShows';
import AddShow from '../components/Shows/AddShow';
import EditShow from '../components/Shows/EditShow';
import InnerNav from '../components/shared/InnerNav';
import ShowDescription from '../components/Shows/ShowDescription/ShowDesciprtion';
const initialState = {
  loading: false,
  allMovies: [],
  status: '',
};

const Shows = () => {
  const [movies, setMovies] = useState(initialState);
  const { path } = useRouteMatch();
  return (
    <>
      <InnerNav
        linkUrl='add-show'
        linkText='Add New Show'
        homeText='All Shows'
      />

      <Switch>
        <PrivateRoute path={path} exact>
          <AllShows movies={movies} setMovies={setMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-show`} exact>
          <AddShow movies={movies} setMovies={setMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId/edit`}>
          <EditShow allMovies={movies.allMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId`}>
          <ShowDescription allMovies={movies.allMovies} />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default Shows;
