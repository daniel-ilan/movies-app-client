import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const StyledLabel = styled(Form.Label)`
  display: flex;
  flex-direction: row-reverse;
`;

const StyledFormGroup = styled(Form.Group)`
  display: flex;
  justify-content: flex-start;
`;

const FormCheckbox = ({ changed, label, id, value }) => {
  return (
    <StyledFormGroup>
      <StyledLabel>
        {label}
        <Form.Check
          id={id}
          onChange={changed}
          checked={value || false}
          name={id}
          type='checkbox'
        />
      </StyledLabel>
    </StyledFormGroup>
  );
};

export default FormCheckbox;
