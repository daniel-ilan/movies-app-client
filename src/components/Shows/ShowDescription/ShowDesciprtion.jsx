import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styled';

const ShowDescription = ({ allMovies }) => {
  const { showId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setSelectedMovie(allMovies[showId]);
  }, [allMovies, showId]);

  return selectedMovie ? (
    <S.Wrapper>
      <S.MovieImage src={selectedMovie.image} />
      <S.DescriptionContainer>
        <S.MovieTitle>{selectedMovie.name}</S.MovieTitle>
        <S.RatingGenersContainer>
          <S.Genres>{selectedMovie.genres.join(', ')}</S.Genres>
          <S.Rating>{selectedMovie.rating}</S.Rating>
        </S.RatingGenersContainer>
        <S.MovieDescription
          dangerouslySetInnerHTML={{ __html: selectedMovie.summary }}
        />
      </S.DescriptionContainer>
    </S.Wrapper>
  ) : (
    <div>SPINNER!!</div>
  );
};

export default ShowDescription;
