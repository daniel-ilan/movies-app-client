import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiDeleteOutline } from '@mdi/js';
import * as S from './styled';
import { useShows } from '../../../context/ShowsContext';
import { OutLineButtonLink } from '../../shared/Buttons';

const ShowDescription = ({ allMovies }) => {
  const { allShows } = useShows();
  const { showId } = useParams();
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const show = allShows.find((movie) => movie._id === showId);
    setSelectedMovie(show);
  }, [allMovies, showId]);

  return selectedMovie ? (
    <S.Wrapper>
      <S.MovieImage src={selectedMovie.image} />
      <S.DescriptionContainer>
        <S.MovieHeader>
          <S.MovieTitle>{selectedMovie.name}</S.MovieTitle>
          <S.RatingGenersContainer>
            <S.Genres>{selectedMovie.genres.join(', ')}</S.Genres>
            <S.Rating>{selectedMovie.rating}</S.Rating>
            <OutLineButtonLink to={`${url}/edit`} borderColor='darkcyan'>
              {' '}
              <Icon
                path={mdiAccountEditOutline}
                title='User Profile'
                size={1}
              />
              Edit
            </OutLineButtonLink>
            <OutLineButtonLink to={`${url}/delete`} borderColor='#522a2a'>
              <Icon path={mdiDeleteOutline} title='User Profile' size={1} />
              Delete
            </OutLineButtonLink>
          </S.RatingGenersContainer>
        </S.MovieHeader>
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
