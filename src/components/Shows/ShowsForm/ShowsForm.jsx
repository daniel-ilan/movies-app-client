import React, { useEffect, useReducer, useState } from 'react';
import API from '../../../api';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import FormTextArea from '../../shared/FormTextArea';
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

const leftInputs = ['name', 'genres', 'image'];
const centerInputs = ['premiered', 'rating'];

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

const ShowForm = ({ url, buttonText, headerText, showData }) => {
  const { authDetails } = useAuth();
  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event) => {
    console.log('submit');
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
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (showData) {
      for (const key in showData) {
        if (Object.hasOwnProperty.call(showData, key)) {
          const value = showData[key];
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
  }, [showData]);
  return (
    <div>
      <FormModal status={status} setStatus={setStatus} message={message} />
      <S.FormWrapper>
        <S.Header>{headerText}</S.Header>
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
                      width={350}
                    />
                  )
                );
              })}
            </S.LeftInputs>
            <S.RightInputs>
              {Object.keys(formData).map((key) => {
                return (
                  centerInputs.includes(key) && (
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
            <S.TextArea>
              {Object.keys(formData).map((key) => {
                return (
                  key === 'summary' && (
                    <FormTextArea
                      changed={(e) =>
                        onInputChange(key, e.target.value, dispatch, formData)
                      }
                      key={key}
                      id={key}
                      data={formData[key]}
                      onFocusOut={(e) =>
                        onFocusOut(key, e.target.value, dispatch, formData)
                      }
                      width={350}
                    />
                  )
                );
              })}
            </S.TextArea>
          </S.InputsWrapper>
          <PrimaryButton
            type='submit'
            onClick={handleSubmit}
            disabled={!formData.isFormValid}>
            {buttonText}
          </PrimaryButton>
        </S.Form>
      </S.FormWrapper>
    </div>
  );
};

export default ShowForm;
