import React, { useEffect, useState } from 'react';
import API from '../../../api';

const AllUsers = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const usersData = await API.post(
        '/pagination-users',
        { page: page },
        {
          headers: { Authorization: `Barer ${token}` },
        },
      );
      setUsers(usersData.data.users);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h2>AllUsers page!</h2>
      {!loading &&
        users.map((user, index) => {
          return <div key={index}>{user.username}</div>;
        })}
    </div>
  );
};

export default AllUsers;
