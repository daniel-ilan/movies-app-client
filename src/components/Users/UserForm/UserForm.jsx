import React, { useEffect, useReducer, useState } from 'react';
import API from '../../../api';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import FormCheckbox from '../../shared/FormCheckbox';
import {
  STATUS,
  UPDATE_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
  initialForm,
} from '../../../utils/helpers';
import { FormModal } from '../../shared/Modals';
import { PrimaryButton } from '../../shared/Buttons';

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

const UserForm = ({ token, url, buttonText, headerText, userData }) => {
  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);

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
        // form is valid
        const formatedData = {};
        for (const field in formData) {
          formatedData[field] = formData[field].value;
        }

        const response = await API.post(url, formatedData, {
          headers: { Authorization: `Barer ${token}` },
        });
        setStatus(STATUS.success);
        setMessage(response.data.message);
      }

      // setFormData({ key: 'reset' });
    } catch (error) {
      setStatus(STATUS.fail);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userData) {
      // get the user's permissions
      const { permissions } = userData;
      // set permissions as key-value pairs for the form
      for (const permission of permissions) {
        userData[permission] = true;
      }
      for (const key in userData) {
        if (Object.hasOwnProperty.call(userData, key)) {
          const value = userData[key];
          dispatch({
            type: UPDATE_FORM,
            data: {
              value,
              name: key,
              touched: true,
              isFormValid: true,
            },
          });
        }
      }
    }
  }, [userData]);
  return (
    <div>
      <FormModal status={status} setStatus={setStatus} message={message} />
      <S.FormWrapper>
        <S.Header>{headerText}</S.Header>
        <S.FormHeader>
          {showError && !formData.isFormValid && (
            <S.FormError>Please fill all the fields correctly</S.FormError>
          )}
        </S.FormHeader>

        <S.Form>
          <S.InputsWrapper>
            <S.Credentials>
              {Object.keys(formData).map((key) => {
                if (
                  formData[key].type === 'text' ||
                  formData[key].type === 'number'
                ) {
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
          <PrimaryButton type='submit' onClick={handleSubmit}>
            {buttonText}
          </PrimaryButton>
        </S.Form>
      </S.FormWrapper>
    </div>
  );
};

export default UserForm;
