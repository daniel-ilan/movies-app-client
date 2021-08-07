import React, { useRef, useState } from 'react';
import { useShows } from '../../../context/ShowsContext';
import { useMembers } from '../../../context/MembersContext';
import { OutLineButton } from '../../shared/Buttons';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiDeleteOutline } from '@mdi/js';
import {
  CardContainer,
  CardActions,
  CardInfoSubHeader,
  CardHeader,
  CardInfoText,
  CardInfoBlock,
} from '../../shared/Card';
import { StyledLinkButton } from '../../shared/Buttons';
import * as S from './styled';
import CustomPopover from '../../shared/CustomPopover';
import { Overlay } from 'react-bootstrap';
import { SelectedShow } from '../../Shows/SelectedShow/SelectedShow';
import EditMemberModal from '../edit-member/EditMemberModal';

const MemberDisplay = ({ member, subscriptions }) => {
  const { _id, city, email, name } = member;
  const [openShows, setOpenShows] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const target = useRef(null);
  const { getShowById } = useShows();
  const { deleteMember } = useMembers();

  const handleDelete = async (memberId) => {
    try {
      await deleteMember(memberId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CardContainer>
        <CardHeader>
          <CardActions>
            <OutLineButton BColor='darkcyan' onClick={() => setOpenModal(true)}>
              Edit
              <Icon path={mdiAccountEditOutline} size={1} />
            </OutLineButton>
            <OutLineButton BColor='#522a2a' onClick={() => handleDelete(_id)}>
              Delete
              <Icon path={mdiDeleteOutline} size={1} />
            </OutLineButton>
          </CardActions>
        </CardHeader>
        <CardInfoBlock>
          <CardInfoSubHeader>Name: </CardInfoSubHeader>
          <CardInfoText>{name}</CardInfoText>
        </CardInfoBlock>
        <CardInfoBlock>
          <CardInfoSubHeader>City: </CardInfoSubHeader>
          <CardInfoText>{city}</CardInfoText>
        </CardInfoBlock>
        <CardInfoBlock>
          <CardInfoSubHeader>Email: </CardInfoSubHeader>
          <CardInfoText>{email}</CardInfoText>
        </CardInfoBlock>
        <hr />
        <S.MoviesWatchedWrapper>
          <S.SubscriptionsHeader>
            <h5>Movies watched</h5>

            <StyledLinkButton
              onClick={() => setOpenShows(!openShows)}
              ref={target}>
              Subscribe to new movie
            </StyledLinkButton>
            <Overlay
              show={openShows}
              onHide={() => setOpenShows(false)}
              target={target.current}
              placement='left'
              flip
              rootClose>
              {({ ...props }) => (
                <CustomPopover {...props} id={_id} title='Shows'>
                  <SelectedShow
                    member={member}
                    onSubmit={() => setOpenShows(false)}
                  />
                </CustomPopover>
              )}
            </Overlay>
          </S.SubscriptionsHeader>
          {subscriptions && subscriptions.movies && (
            <S.SubscriptionsWrapper>
              {subscriptions.movies.map((movie, index) => {
                const show = getShowById(movie.movieId);
                return (
                  <S.MovieItem
                    to={`/main/shows/${show._id}`}
                    key={show._id + index.toString()}>
                    {show.name}
                    <br />
                    {movie.date}
                  </S.MovieItem>
                );
              })}
            </S.SubscriptionsWrapper>
          )}
        </S.MoviesWatchedWrapper>
      </CardContainer>
      <EditMemberModal
        open={openModal}
        setOpen={setOpenModal}
        memberData={member}
      />
    </>
  );
};

export default MemberDisplay;
