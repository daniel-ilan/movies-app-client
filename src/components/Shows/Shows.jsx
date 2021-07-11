import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import * as S from './styled';
import AllShows from './AllShows';
import ShowDescription from './ShowDescription/ShowDesciprtion';

const initialState = {
  loading: false,
  allMovies: [],
  status: '',
};

const Shows = () => {
  const [movies, setMovies] = useState(initialState);
  const { path } = useRouteMatch();

  return (
    <S.Wrapper>
      <S.SideNav></S.SideNav>
      <Switch>
        <PrivateRoute path={path} exact>
          <AllShows movies={movies} setMovies={setMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId`}>
          <ShowDescription allMovies={movies.allMovies} />
        </PrivateRoute>
      </Switch>
    </S.Wrapper>
  );
};

export default Shows;
