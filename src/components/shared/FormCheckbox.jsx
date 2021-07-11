import React from 'react';

const FormCheckbox = ({ changed, label, id, checked }) => {
  return (
    <div>
      <label>
        {label}
        <input
          id={id}
          onChange={changed}
          checked={checked || false}
          name={id}
          type='checkbox'
        />
      </label>
    </div>
  );
};

export default FormCheckbox;
