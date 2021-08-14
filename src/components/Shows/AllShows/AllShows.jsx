import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShows } from '../../../context/ShowsContext';
import ShowDisplay from '../ShowDisplay/ShowDisplay';
import * as S from './styled';

const SHOWS_PER_PAGE = 20;

const AllShows = () => {
  const { filteredShows } = useShows();
  const loader = useRef(null);
  const rootElement = useRef(null);
  const [page, setPage] = useState(0);

  const [showsToRender, setShowsToRender] = useState([]);

  const [initialLoad, setInitialLoad] = useState(true);

  const hasMoreData = showsToRender.length < filteredShows.length;

  const loadMoreShows = useCallback(() => {
    if (hasMoreData) {
      const newShows = Array.from(filteredShows).slice(
        page * SHOWS_PER_PAGE,
        (page + 1) * SHOWS_PER_PAGE,
      );
      console.log('newShows', newShows);
      setShowsToRender((shows) => [...shows, ...newShows]);
      setTimeout(() => {
        setPage((page) => page + 1);
      }, 100);
    }
  }, [filteredShows, page, hasMoreData]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        loadMoreShows();
      }
    },
    [loadMoreShows],
  );

  useEffect(() => {
    setPage(0);
    setShowsToRender([]);
    setInitialLoad(true);
  }, [filteredShows]);

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
      <S.MoviesGrid ref={rootElement}>
        {showsToRender.map((movie, index) => {
          return <ShowDisplay show={movie} key={movie._id} />;
        })}
        <div ref={loader}></div>
      </S.MoviesGrid>
    </S.AllShowsContainer>
  ) : (
    <div>SPINNER!!</div>
  );
};

export default AllShows;
