import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import * as S from './styled';
import AllShows from './AllShows';
import AddShow from './AddShow';
import ShowDescription from './ShowDescription/ShowDesciprtion';
import { StyledLinkButton } from '../shared/Buttons';
const initialState = {
  loading: false,
  allMovies: [],
  status: '',
};

const Shows = () => {
  const [movies, setMovies] = useState(initialState);
  const { path, url } = useRouteMatch();

  return (
    <S.Wrapper>
      <nav>
        <StyledLinkButton to={`${url}`} activeClassName='active' exact>
          All Shows
        </StyledLinkButton>
        <StyledLinkButton to={`${url}/add-show`} activeClassName='active'>
          Add A Show
        </StyledLinkButton>
      </nav>

      <Switch>
        <PrivateRoute path={path} exact>
          <AllShows movies={movies} setMovies={setMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/add-show`} exact>
          <AddShow movies={movies} setMovies={setMovies} />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:showId`}>
          <ShowDescription allMovies={movies.allMovies} />
        </PrivateRoute>
      </Switch>
    </S.Wrapper>
  );
};

export default Shows;
