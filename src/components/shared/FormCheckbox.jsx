import React from 'react';
import { Form } from 'react-bootstrap';

const FormCheckbox = ({ changed, label, id, value }) => {
  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Form.Check
          id={id}
          onChange={changed}
          checked={value || false}
          name={id}
          type='checkbox'
        />
      </Form.Label>
    </Form.Group>
  );
};

export default FormCheckbox;
