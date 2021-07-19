import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import API from '../../../api';
import * as S from './styled';
import { OutLineButton, OutLineButtonLink } from '../../shared/Buttons';
import Avatar from '../../shared/Avatar';
import Icon from '@mdi/react';
import { mdiAccountEditOutline, mdiDeleteOutline } from '@mdi/js';
import { Spinner } from 'react-bootstrap';

const AllUsers = ({ token, users, setUsers }) => {
  const [loading, setLoading] = useState(false);
  const { url } = useRouteMatch();

  const handleDeletUser = async (userId) => {
    try {
      await API.post(
        '/delete-user',
        { userId: userId },
        {
          headers: { Authorization: `Barer ${token}` },
        },
      );
      const newUsers = Array.from(users);
      const userIndexToPop = newUsers.findIndex((user) => user._id === userId);
      newUsers.splice(userIndexToPop, 1);
      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const usersData = await API.post('/all-users', null, {
        headers: { Authorization: `Barer ${token}` },
      });
      setUsers(usersData.data.allUsersData);
      setLoading(false);
    })();
  }, [token, setUsers]);

  if (loading) return <Spinner animation='border' />;

  return (
    <>
      <S.UsersWrapper>
        {!loading &&
          users &&
          users.map((user, index) => {
            return (
              <S.UserContainer key={index}>
                <S.UserHeader>
                  <Avatar firstName={user.firstName} lastName={user.lastName} />
                  <S.UserActions>
                    <OutLineButtonLink
                      borderColor='darkcyan'
                      to={`${url}/edit-user/${index}`}>
                      Edit{'  '}
                      <Icon
                        path={mdiAccountEditOutline}
                        title='User Profile'
                        size={1}
                      />
                    </OutLineButtonLink>
                    <OutLineButton
                      borderColor='#522a2a'
                      onClick={() => handleDeletUser(user._id)}>
                      Delete{'  '}
                      <Icon
                        path={mdiDeleteOutline}
                        title='User Profile'
                        size={1}
                      />
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
                      dangerouslySetInnerHTML={{ __html: '&#x221e' }}
                    />
                  )}
                </S.UserSession>
                <S.UserPermissions>
                  Permisssions:{' '}
                  <S.NormalText>{user.permissions.join(', ')}</S.NormalText>
                </S.UserPermissions>
              </S.UserContainer>
            );
          })}
      </S.UsersWrapper>
    </>
  );
};

export default AllUsers;
