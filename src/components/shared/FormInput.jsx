import React from 'react';

const FormInput = ({ changed, value, label, type, id }) => {
  return (
    <div>
      <label>
        {label}
        <input
          id={id}
          onChange={changed}
          value={value || ''}
          name={id}
          type={type}
        />
      </label>
    </div>
  );
};

export default FormInput;
