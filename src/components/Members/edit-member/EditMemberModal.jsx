import React from 'react';
import MemberForm from '../member-form/MemberForm';
import { useMembers } from '../../../context/MembersContext';
import { Modal } from 'react-bootstrap';

const EditMemberModal = ({ open, setOpen, memberData }) => {
  const handleClose = () => setOpen(false);

  const { editMember } = useMembers();

  const BUTTON_TEXT = 'Update';
  const HEADER_TEXT = 'Edit Member';

  return (
    <Modal show={open} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MemberForm
          buttonText={BUTTON_TEXT}
          headerText={HEADER_TEXT}
          action={editMember}
          memberData={memberData}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditMemberModal;
