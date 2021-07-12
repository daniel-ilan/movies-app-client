import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const Error = styled.div`
  color: red;
  margin-block: 0.25rem;
  max-width: 50%;
`;

const FormInput = ({ changed, data, id, onFocusOut }) => {
  const { value, type, error, touched, label, hasError } = data;

  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Form.Control
          id={id}
          onChange={changed}
          value={value || ''}
          name={id}
          type={type}
          onBlur={onFocusOut}
        />
      </Form.Label>
      {touched && hasError && <Error className='error'>{error}</Error>}
    </Form.Group>
  );
};

export default FormInput;
