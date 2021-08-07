import React from 'react';
import MemberForm from '../member-form/MemberForm';
import { useMembers } from '../../../context/MembersContext';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledModal = styled.div`
  background-color: hsl(218deg 15% 8%);
  color: whitesmoke;
  border: 1px solid #b5b5b542;
`;

const StyledModalHeader = styled(Modal.Header)`
  border-color: #b5b5b542;
`;

const StyledModalBody = styled(Modal.Body)`
  border: 1px solid #b5b5b500;
`;

const EditMemberModal = ({ open, setOpen, memberData }) => {
  const handleClose = () => setOpen(false);

  const { editMember } = useMembers();

  const BUTTON_TEXT = 'Update';
  const HEADER_TEXT = 'Edit Member';

  return (
    <Modal show={open} onHide={handleClose} size='xl'>
      <StyledModal>
        <StyledModalHeader closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          <MemberForm
            buttonText={BUTTON_TEXT}
            headerText={HEADER_TEXT}
            action={editMember}
            memberData={memberData}
          />
        </StyledModalBody>
      </StyledModal>
    </Modal>
  );
};

export default EditMemberModal;
