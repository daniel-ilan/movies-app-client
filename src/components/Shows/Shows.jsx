import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import AllShows from './AllShows';
import AddShow from './AddShow';
import EditShow from './EditShow';
import InnerNav from '../shared/InnerNav';
import ShowDescription from './ShowDescription/ShowDesciprtion';
const initialState = {
  loading: false,
  allMovies: [],
  status: '',
};

const Shows = () => {
  const [movies, setMovies] = useState(initialState);
  const { path } = useRouteMatch();
  console.log(path);
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
