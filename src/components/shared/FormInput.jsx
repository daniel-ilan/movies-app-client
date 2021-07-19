import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const Error = styled.div`
  color: red;
`;

const StyledLabel = styled(Form.Label)`
  margin-bottom: 0;
  width: 100%;
`;

const StyledFormGroup = styled(Form.Group)`
  width: ${(props) => props.width || 250}px;
`;

const FormInput = ({ changed, data, id, onFocusOut, width }) => {
  const { value, type, error, touched, label, hasError } = data;

  return (
    <StyledFormGroup width={width}>
      <StyledLabel>
        {label}
        <Form.Control
          id={id}
          onChange={changed}
          value={value || ''}
          name={id}
          type={type}
          onBlur={onFocusOut}
        />
      </StyledLabel>
      {touched && hasError && <Error className='error'>{error}</Error>}
    </StyledFormGroup>
  );
};

export default FormInput;
