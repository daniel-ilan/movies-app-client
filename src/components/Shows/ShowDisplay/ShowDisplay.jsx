import React from 'react';
import * as S from './styled';
import { useRouteMatch } from 'react-router-dom';
import { useSubscriptions } from '../../../context/SubscriptionsContext';
import { useMembers } from '../../../context/MembersContext';
import { useAuth } from '../../../context/UserContext';

const ShowDisplay = ({ show }) => {
  const { path } = useRouteMatch();
  const { authDetails } = useAuth();
  const { allSubscriptions } = useSubscriptions();
  const { getMemberById } = useMembers();
  const showSubscribers = [];

  if (authDetails.permissions.includes('viewSubscriptions')) {
    allSubscriptions.forEach((subscription) => {
      const isSubscribed = subscription.movies.find(
        (movie) => movie.movieId === show._id,
      );
      if (isSubscribed) {
        showSubscribers.push({
          date: isSubscribed.date,
          member: getMemberById(subscription.memberId),
        });
      }
    });
  }

  return (
    <S.ShowCard>
      <S.ShowLink to={`${path}/${show._id}`}>
        <S.ShowHeader>
          <S.Rating>{show.rating}</S.Rating>
          <S.ShowImage width='100%' height='280' src={`${show.image}`} />
        </S.ShowHeader>
        <S.CardBody>
          <S.ShowTitle>{show.name}</S.ShowTitle>
          <S.Small>{show.genres.join(', ')}</S.Small>
        </S.CardBody>
      </S.ShowLink>
      {authDetails.permissions.includes('viewSubscriptions') && (
        <>
          <hr />
          <S.CardFooter>
            <h6>Subscribers</h6>
            <S.SubscribersContainer>
              {showSubscribers.map((subsciption) => {
                return (
                  // Add functionality to scroll down and highlight the member that was clicked
                  <S.Subscriber
                    to='/main/members/'
                    key={subsciption.member._id}>
                    <span>{subsciption.member.name}</span>
                    <S.Small>{subsciption.date}</S.Small>
                  </S.Subscriber>
                );
              })}
            </S.SubscribersContainer>
          </S.CardFooter>
        </>
      )}
    </S.ShowCard>
  );
};

export default ShowDisplay;
