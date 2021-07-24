import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiDeleteOutline } from '@mdi/js';
import * as S from './styled';
import { useShows } from '../../../context/ShowsContext';
import { OutLineButtonLink, OutLineButton } from '../../shared/Buttons';

const ShowDescription = () => {
  const { allShows, deleteShow } = useShows();
  const { showId } = useParams();
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const history = useHistory();

  const handleDelete = async (showId) => {
    try {
      const response = await deleteShow(showId);
      history.push('/main/shows');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const show = allShows.find((movie) => movie._id === showId);
    setSelectedMovie(show);
  }, [allShows, showId]);

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
            <OutLineButton
              onClick={() => handleDelete(showId)}
              borderColor='#522a2a'>
              <Icon path={mdiDeleteOutline} title='User Profile' size={1} />
              Delete
            </OutLineButton>
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
