import React from 'react';
import UserForm from './UserForm/UserForm';

const AddUser = ({ token }) => {
  const URL = '/add-user';
  const BUTTON_TEXT = 'Add User';
  const HEADER_TEXT = 'New User';
  return (
    <div>
      <UserForm
        token={token}
        url={URL}
        buttonText={BUTTON_TEXT}
        headerText={HEADER_TEXT}
      />
    </div>
  );
};

export default AddUser;
