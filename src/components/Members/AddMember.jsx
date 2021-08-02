import React from 'react';
import MemberForm from './member-form/MemberForm';
import { useMembers } from '../../context/MembersContext';

const AddMember = () => {
  const BUTTON_TEXT = 'Add Member';
  const HEADER_TEXT = 'New Member';
  const { addNewMember } = useMembers();
  return (
    <div>
      <MemberForm
        action={addNewMember}
        buttonText={BUTTON_TEXT}
        headerText={HEADER_TEXT}
      />
    </div>
  );
};

export default AddMember;
