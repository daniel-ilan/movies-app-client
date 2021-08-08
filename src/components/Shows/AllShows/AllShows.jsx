import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShows } from '../../../context/ShowsContext';

import ShowDisplay from '../ShowDisplay/ShowDisplay';
import * as S from './styled';

const SHOWS_PER_PAGE = 20;

const AllShows = () => {
  const { allShows } = useShows();

  const loader = useRef(null);
  const rootElement = useRef(null);
  const [page, setPage] = useState(0);

  const [showsToRender, setShowsToRender] = useState([]);

  const [initialLoad, setInitialLoad] = useState(true);

  const hasMoreData = showsToRender.length < allShows.length;

  const loadMoreShows = useCallback(() => {
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
