import React, { useEffect, useReducer, useState } from 'react';
import API from '../../../api';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import {
  STATUS,
  UPDATE_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
  initialForm,
} from '../../../utils/moviesHelpers';
import { FormModal } from '../../shared/Modals';
import { PrimaryButton } from '../../shared/Buttons';
import { useAuth } from '../../../context/UserContext';

const leftInputs = ['rating', 'movieName', 'imageUrl', 'premired'];
const rightInputs = ['summary', 'genres'];

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

const ShowForm = ({ url, buttonText, headerText, userData }) => {
  const { authDetails } = useAuth();
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
          headers: { Authorization: `Barer ${authDetails.token}` },
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
            <S.LeftInputs>
              {Object.keys(formData).map((key) => {
                return (
                  leftInputs.includes(key) && (
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
                  )
                );
              })}
            </S.LeftInputs>
            <S.RightInputs>
              {Object.keys(formData).map((key) => {
                return (
                  rightInputs.includes(key) && (
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
                  )
                );
              })}
            </S.RightInputs>
          </S.InputsWrapper>
          <PrimaryButton type='submit' onClick={handleSubmit}>
            {buttonText}
          </PrimaryButton>
        </S.Form>
      </S.FormWrapper>
    </div>
  );
};

export default ShowForm;
