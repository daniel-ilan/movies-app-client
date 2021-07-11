import React from 'react';
import UserForm from './UserForm/UserForm';

const AddUser = ({ token }) => {
  return (
    <div>
      <h2>AddUser page!</h2>
      <UserForm token={token} />
    </div>
  );
};

export default AddUser;
