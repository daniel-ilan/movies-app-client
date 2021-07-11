import React, { useReducer, useState } from 'react';
import API from '../../../api';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import FormCheckbox from '../../shared/FormCheckbox';

const initialForm = {
  firstName: {
    label: 'First Name',
    value: '',
    type: 'text',
  },
  lastName: {
    label: 'Last Name',
    value: '',
    type: 'text',
  },
  username: {
    label: 'User Name',
    value: '',
    type: 'text',
  },
  sessionTimeOut: {
    label: 'Session time-out (In minutes)',
    value: '',
    type: 'number',
  },
  viewSubscriptions: {
    label: 'View Subscriptions',
    checked: false,
    type: 'checkbox',
  },
  createSubscriptions: {
    label: 'Create Subscriptions',
    checked: false,
    type: 'checkbox',
  },
  deleteSubscriptions: {
    label: 'Delete Subscriptions',
    checked: false,
    type: 'checkbox',
  },
  updateSubscriptions: {
    label: 'Update Subscriptions',
    checked: false,
    type: 'checkbox',
  },
  viewMovies: {
    label: 'View Movies',
    checked: false,
    type: 'checkbox',
  },
  createMovies: {
    label: 'Create Movies',
    checked: false,
    type: 'checkbox',
  },
  deleteMovies: {
    label: 'Delete Movies',
    checked: false,
    type: 'checkbox',
  },
  updateMovies: {
    label: 'Update Movies',
    checked: false,
    type: 'checkbox',
  },
};

const formReducer = (state, { value, key }) => {
  const updatedElement = { ...state[key] };
  const isCheckbox = updatedElement.type === 'checkbox';
  if (isCheckbox) {
    updatedElement.checked = !updatedElement.checked;
  } else {
    updatedElement.value = value;
  }
  return { ...state, [key]: updatedElement };
};

const UserForm = ({ token }) => {
  const [formData, setFormData] = useReducer(formReducer, initialForm);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formatedData = {};
      Object.entries(formData).forEach(([key, field]) => {
        if (field.type === 'checkbox') {
          return (formatedData[key] = field.checked);
        }
        return (formatedData[key] = field.value);
      });

      const result = await API.post('/add-user', formatedData, {
        headers: { Authorization: `Barer ${token}` },
      });
      console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add new user</h2>
      <S.FormWrapper>
        <S.Form>
          {Object.keys(formData).map((key) =>
            formData[key].type === 'checkbox' ? (
              <FormCheckbox
                key={key}
                id={key}
                checked={formData[key].checked}
                label={formData[key].label}
                changed={({ target: { checked } }) =>
                  setFormData({ checked, key })
                }
              />
            ) : (
              <FormInput
                changed={({ target: { value } }) => setFormData({ value, key })}
                key={key}
                id={key}
                value={formData[key].value}
                label={formData[key].label}
                type={formData[key].type}
              />
            ),
          )}
          <button type='submit' onClick={handleSubmit}>
            Add user
          </button>
        </S.Form>
      </S.FormWrapper>
    </div>
  );
};

export default UserForm;
