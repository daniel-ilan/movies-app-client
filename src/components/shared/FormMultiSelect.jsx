import React, { useEffect, useRef, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const MaxOptions = styled.div`
  color: lightgray;
`;

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

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'whitesmoke' }),
  option: (styles, { isSelected, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? 'hsl(249deg 43% 46%/ 10%)' : null,
      color: 'hsl(249deg 43% 46%)',
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected
          ? 'hsl(249deg 43% 46%)'
          : 'hsl(249deg 43% 20%)',
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'hsl(249deg 43% 46% / 15%)',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'hsl(249deg 43% 46%)',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'hsl(249deg 43% 46%)',
    ':hover': {
      backgroundColor: 'hsl(249deg 43% 46%)',
      color: 'white',
    },
  }),
};

const MultiSelect = ({
  options,
  changed,
  data,
  id,
  onFocusOut,
  width,
  maxOptions,
  initialGenres,
}) => {
  const [values, setValues] = useState([]);
  const select = useRef(null);
  const [selectOptions, setSelectOptions] = useState([]);

  const { error, touched, label, hasError } = data;

  const handleChange = (newValue) => {
    const value = newValue.map((val) => val.value);
    changed(value);
    setValues(newValue);
  };

  const handleFocusOut = () => {
    onFocusOut(values);
  };

  useEffect(() => {
    const formatOptions = options.map((option) => {
      if (option && option.value) {
        return option;
      }
      return { value: option, label: option };
    });
    setSelectOptions(formatOptions);
  }, [options]);

  useEffect(() => {
    setValues(initialGenres);
  }, [initialGenres]);

  return (
    <StyledFormGroup width={width}>
      <StyledLabel>
        {label}
        <CreatableSelect
          ref={select}
          isMulti
          onChange={handleChange}
          options={values.length >= maxOptions ? null : selectOptions}
          styles={colourStyles}
          id={id}
          closeMenuOnSelect={false}
          name={id}
          onBlur={handleFocusOut}
          value={values}
          noOptionsMessage={() => 'Maximum number of genres selected'}
        />
      </StyledLabel>
      {values.length >= maxOptions && (
        <MaxOptions>Maximum number of genres selected</MaxOptions>
      )}
      {touched && hasError && <Error>{error}</Error>}
    </StyledFormGroup>
  );
};

export default MultiSelect;
