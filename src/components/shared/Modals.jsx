import React, { useEffect, useState } from 'react';
import { STATUS } from '../../utils/usersHelpers';
import { Modal } from 'react-bootstrap';

export const FormModal = ({ status, setStatus, message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === STATUS.success || status === STATUS.fail) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [status]);

  const handleClose = () => setStatus(STATUS.init);

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};
