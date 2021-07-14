import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm/UserForm';

const EditUser = ({ token, users }) => {
  const URL = '/update-user';
  const BUTTON_TEXT = 'Update user';
  const HEADER_TEXT = 'Edit User';
  let { userIndex } = useParams();
  const userData = users[userIndex];
  return (
    <div>
      <UserForm
        token={token}
        url={URL}
        buttonText={BUTTON_TEXT}
        userData={userData}
        headerText={HEADER_TEXT}
      />
    </div>
  );
};

export default EditUser;
