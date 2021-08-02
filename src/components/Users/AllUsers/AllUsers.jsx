import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import API from '../../../api';
import { Spinner } from 'react-bootstrap';
import UserDisplay from '../user-display/UserDisplay';
import { FlexWrap } from '../../shared/Wrapper';
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
      <FlexWrap>
        {!loading &&
          users &&
          users.map((user, index) => {
            return (
              <UserDisplay
                key={index}
                index={index}
                url={url}
                handleDeletUser={handleDeletUser}
                user={user}
              />
            );
          })}
      </FlexWrap>
    </>
  );
};

export default AllUsers;
