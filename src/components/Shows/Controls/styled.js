import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import Icon from '@mdi/react';

export const SideNav = styled.div`
  margin-inline: 50px auto;
  display: flex;
  gap: 20px;
`;

export const SearchShow = styled.div`
  display: grid;
  grid-template-columns: auto 2.5rem;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  grid-row: 1;
  grid-column: 2;
  pointer-events: none;
`;

export const StyledLabel = styled(Form.Label)``;

export const StyledFormGroup = styled(Form.Group)`
  width: ${(props) => props.width || 250};
`;

export const StyledInput = styled(Form.Control)`
  grid-row: 1;
  grid-column: 1 / span 2;
  width: 350px;
  background-color: transparent;
  border: none;
  border: 1px solid transparent;
  border-bottom: 1px solid #333333;
  transition: 0.2s all;
  grid-row: 1;
  grid-column: 1 / span 2;

  &:focus,
  &:focus-visible,
  &:hover {
    color: whitesmoke;
    background-color: hsl(209deg 15% 8%);
    outline: 0;
    box-shadow: 0px 0px 4px 2px rgb(0 0 0 / 100%);
    border: 1px solid #333333;
  }
`;

export const SearchGenres = styled.div`
  min-width: 300px;
  max-width: 500px;
`;

export const colourStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: '#333333',
    ':hover': {
      borderColor: '#333333',
      boxShadow: '0px 0px 4px 2px rgb(0 0 0 / 100%)',
    },
    ':active': {
      borderColor: '#333333',
      boxShadow: '0px 0px 4px 2px rgb(0 0 0 / 100%)',
    },
    ':focus': {
      borderColor: '#333333',
      boxShadow: '0px 0px 4px 2px rgb(0 0 0 / 100%)',
    },
    ':focus-within': {
      borderColor: '#333333',
      boxShadow: '0px 0px 4px 2px rgb(0 0 0 / 100%)',
    },
  }),
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
  dropdownIndicator: (styles) => {
    return {
      ...styles,
      color: '#333333',
    };
  },
  clearIndicator: (styles) => {
    return {
      ...styles,
      color: '#333333',
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      backgroundColor: '#333333',
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
