import React from 'react';
import { OutLineButton, OutLineButtonLink } from '../../shared/Buttons';
import Avatar from '../../shared/Avatar';
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

const UserDisplay = ({ index, url, handleDeletUser, user }) => {
  return (
    <CardContainer>
      <CardHeader>
        <Avatar firstName={user.firstName} lastName={user.lastName} />
        <CardActions>
          <OutLineButtonLink BColor='darkcyan' to={`${url}/edit-user/${index}`}>
            Edit{'  '}
            <Icon path={mdiAccountEditOutline} title='User Profile' size={1} />
          </OutLineButtonLink>
          <OutLineButton
            BColor='#522a2a'
            onClick={() => handleDeletUser(user._id)}>
            Delete{'  '}
            <Icon path={mdiDeleteOutline} title='User Profile' size={1} />
          </OutLineButton>
        </CardActions>
      </CardHeader>
      <CardInfoBlock>
        <CardInfoSubHeader>Name: </CardInfoSubHeader>
        <CardInfoText>{`${user.firstName} ${user.lastName}`}</CardInfoText>
      </CardInfoBlock>
      <CardInfoBlock>
        <CardInfoSubHeader>User Name: </CardInfoSubHeader>
        <CardInfoText>{user.username}</CardInfoText>
      </CardInfoBlock>
      <CardInfoBlock>
        <CardInfoSubHeader>Session Time Out (Minutes): </CardInfoSubHeader>
        {user.sessionTimeOut || (
          <CardInfoText
            dangerouslySetInnerHTML={{
              __html: '&#x221e',
            }}
          />
        )}
      </CardInfoBlock>
      <CardInfoBlock>
        <CardInfoSubHeader>Permisssions: </CardInfoSubHeader>
        <CardInfoText>{user.permissions.join(', ')}</CardInfoText>
      </CardInfoBlock>
    </CardContainer>
  );
};

export default UserDisplay;
