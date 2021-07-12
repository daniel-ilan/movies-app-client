import React from 'react';
import UserForm from './UserForm/UserForm';

const AddUser = ({ token }) => {
  return (
    <div>
      <UserForm token={token} />
    </div>
  );
};

export default AddUser;
