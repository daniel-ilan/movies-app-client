import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import API from '../../api';
import * as S from './styled';
import { useRouteMatch } from 'react-router-dom';

const AllShows = ({ movies, setMovies }) => {
  const { authDetails } = useAuth();
  const { path } = useRouteMatch();
  const loader = useRef(null);
  const rootElement = useRef(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const handleObserver = (entities) => {
    console.log(entities);
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    if (movies.allMovies.length < 240) {
      (async () => {
        setMovies({ ...movies, loading: true });
        const token = authDetails.token;

        const moviesData = await API.post(
          '/pagination-movies',
          { nextPage: nextPage },
          {
            headers: { Authorization: `Barer ${token}` },
          },
        );
        setMovies({
          allMovies: movies.allMovies.concat(moviesData.data.movies),
          loading: false,
          status: 'success',
        });
        setNextPage(moviesData.data.next);
      })();
    }
  }, [page]);

  useEffect(() => {
    if (loader.current && rootElement.current) {
      var options = {
        root: rootElement.current,
        rootMargin: '20px',
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(loader.current);
    }
  }, [movies.status]);

  return movies.status === 'success' ? (
    <S.MoviesGrid ref={rootElement}>
      {movies.allMovies.map((movie, index) => {
        return (
          <S.MovieCard key={index} to={`${path}/${index}`}>
            <S.Rating>{movie.rating}</S.Rating>
            <S.MovieImage width='100%' height='380' src={`${movie.image}`} />
            <S.CardActions>
              <S.MovieTitle>{movie.name}</S.MovieTitle>
              <S.Genres>{movie.genres.join(', ')}</S.Genres>
            </S.CardActions>
          </S.MovieCard>
        );
      })}
      <div ref={loader}></div>
    </S.MoviesGrid>
  ) : (
    <div>SPINNER!!</div>
  );
};

export default AllShows;
