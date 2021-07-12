import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { STATUS } from '../../utils/helpers';

export const FormModal = ({ shouldOpen, setShouldOpen, message }) => {
  const handleClose = () => setShouldOpen(false);

  return (
    <Modal show={shouldOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};
