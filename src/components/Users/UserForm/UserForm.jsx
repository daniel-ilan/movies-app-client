import React, { useReducer, useState } from 'react';
import API from '../../../api';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import FormCheckbox from '../../shared/FormCheckbox';
import { PrimaryButton } from '../../shared/Buttons';
import {
  STATUS,
  initialForm,
  UPDATE_FORM,
  RESET_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
} from '../../../utils/helpers';
import { FormModal } from '../../shared/Modals';

const formReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    case RESET_FORM:
      return initialForm;
    default:
      return state;
  }
};

const UserForm = ({ token }) => {
  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [shouldOpen, setShouldOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.loading);
    let isFormValid = true;
    try {
      for (const name in formData) {
        const item = formData[name];
        const { value } = item;
        const { hasError, error } = validateInput(name, value);
        if (hasError) {
          isFormValid = false;
        }
        if (name) {
          dispatch({
            type: UPDATE_FORM,
            data: {
              name,
              value,
              hasError,
              error,
              touched: true,
              isFormValid,
            },
          });
        }
      }
      if (!isFormValid) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      } else {
        const formatedData = {};
        for (const field in formData) {
          formatedData[field] = formData[field].value;
        }

        const response = await API.post('/add-user', formatedData, {
          headers: { Authorization: `Barer ${token}` },
        });
        dispatch({ type: RESET_FORM });
        setStatus(STATUS.success);
        setMessage(response.data.message);
        setShouldOpen(true);
      }

      // setFormData({ key: 'reset' });
    } catch (error) {
      setStatus(STATUS.fail);
      setMessage(error.response.data.message);
      setShouldOpen(true);
    }
  };

  return (
    <>
      <S.Header>Add new user</S.Header>
      <S.FormWrapper>
        <S.FormHeader>
          <FormModal
            shouldOpen={shouldOpen}
            setShouldOpen={setShouldOpen}
            message={message}
          />
          {showError && !formData.isFormValid && (
            <S.FormError>Please fill all the fields correctly</S.FormError>
          )}
        </S.FormHeader>

        <S.Form>
          <S.InputsWrapper>
            <S.Credentials>
              {Object.keys(formData).map((key) => {
                if (formData[key].type === 'text') {
                  return (
                    <FormInput
                      changed={(e) =>
                        onInputChange(key, e.target.value, dispatch, formData)
                      }
                      key={key}
                      id={key}
                      data={formData[key]}
                      onFocusOut={(e) =>
                        onFocusOut(key, e.target.value, dispatch, formData)
                      }
                    />
                  );
                }
              })}
            </S.Credentials>
            <S.Permissions>
              {Object.keys(formData).map((key) => {
                if (formData[key].type === 'checkbox') {
                  return (
                    <FormCheckbox
                      key={key}
                      id={key}
                      value={formData[key].value}
                      label={formData[key].label}
                      changed={(e) =>
                        onInputChange(key, e.target.checked, dispatch, formData)
                      }
                      onFocusOut={onFocusOut}
                    />
                  );
                }
              })}
            </S.Permissions>
          </S.InputsWrapper>
          <PrimaryButton type='submit' onClick={handleSubmit} size='lg'>
            Add user
          </PrimaryButton>
        </S.Form>
      </S.FormWrapper>
    </>
  );
};

export default UserForm;
