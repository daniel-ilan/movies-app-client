import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShows } from '../../context/ShowsContext';
import * as S from './styled';
import { useRouteMatch } from 'react-router-dom';

const SHOWS_PER_PAGE = 20;

const AllShows = () => {
  const { path } = useRouteMatch();
  const loader = useRef(null);
  const rootElement = useRef(null);
  const [page, setPage] = useState(0);
  const { allShows } = useShows();
  const [showsToRender, setShowsToRender] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const hasMoreData = showsToRender.length < allShows.length;

  const loadMoreShows = useCallback(() => {
    console.log('showsToRender', showsToRender);
    if (hasMoreData) {
      const newShows = Array.from(allShows).slice(
        page * SHOWS_PER_PAGE,
        (page + 1) * SHOWS_PER_PAGE,
      );
      setShowsToRender((shows) => [...shows, ...newShows]);
      setPage((page) => page + 1);
    }
  }, [allShows, page, hasMoreData]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      console.log('sss');
      if (target.isIntersecting) {
        loadMoreShows();
      }
    },
    [loadMoreShows],
  );
  useEffect(() => {
    if (loader.current && rootElement.current) {
      const toObserve = loader.current;
      const options = {
        root: rootElement.current,
        rootMargin: '20px',
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(toObserve);
      return () => observer.unobserve(toObserve);
    }
  }, [loader, handleObserver, initialLoad]);

  useEffect(() => {
    if (initialLoad) {
      loadMoreShows();
      setInitialLoad(false);
    }
  }, [loadMoreShows, initialLoad]);

  return showsToRender.length > 0 ? (
    <S.AllShowsContainer>
      <S.SideNav></S.SideNav>
      <S.MoviesGrid ref={rootElement}>
        {showsToRender.map((movie, index) => {
          return (
            <S.MovieCard key={movie._id} to={`${path}/${movie._id}`}>
              <S.MovieHeader>
                <S.Rating>{movie.rating}</S.Rating>
                <S.MovieImage
                  width='100%'
                  height='280'
                  src={`${movie.image}`}
                />
              </S.MovieHeader>
              <S.CardActions>
                <S.MovieTitle>{movie.name}</S.MovieTitle>
                <S.Genres>{movie.genres.join(', ')}</S.Genres>
              </S.CardActions>
            </S.MovieCard>
          );
        })}
        <div ref={loader}></div>
      </S.MoviesGrid>
    </S.AllShowsContainer>
  ) : (
    <div>SPINNER!!</div>
  );
};

export default AllShows;
