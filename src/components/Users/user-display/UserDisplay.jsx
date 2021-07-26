import React from 'react';
import * as S from './styled';
import { OutLineButton, OutLineButtonLink } from '../../shared/Buttons';
import Avatar from '../../shared/Avatar';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiDeleteOutline } from '@mdi/js';

const UserDisplay = ({ index, url, handleDeletUser, user }) => {
  return (
    <S.UserContainer>
      <S.UserHeader>
        <Avatar firstName={user.firstName} lastName={user.lastName} />
        <S.UserActions>
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
        </S.UserActions>
      </S.UserHeader>
      <S.UserFullName>
        Name:
        <S.NormalText>{`${user.firstName} ${user.lastName}`}</S.NormalText>
      </S.UserFullName>
      <S.Username>
        User Name: <S.NormalText>{user.username}</S.NormalText>
      </S.Username>
      <S.UserSession>
        Session Time Out (Minutes):{' '}
        {user.sessionTimeOut || (
          <S.NormalText
            dangerouslySetInnerHTML={{
              __html: '&#x221e',
            }}
          />
        )}
      </S.UserSession>
      <S.UserPermissions>
        Permisssions: <S.NormalText>{user.permissions.join(', ')}</S.NormalText>
      </S.UserPermissions>
    </S.UserContainer>
  );
};

export default UserDisplay;
