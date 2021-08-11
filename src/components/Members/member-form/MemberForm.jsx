import React, { useEffect, useReducer, useState } from 'react';
import * as S from './styled';
import FormInput from '../../shared/FormInput';
import { validateInput, initialForm } from '../../../utils/memberHelpers';
import { FormModal } from '../../shared/Modals';
import { PrimaryButton } from '../../shared/Buttons';
import {
  initForm,
  UPDATE_FORM,
  RESET_FORM,
  STATUS,
  focusOut,
  inputChange,
} from '../../../utils/formHelpers';

const MemberForm = ({ action, buttonText, headerText, memberData }) => {
  const formReducer = initForm(initialForm);
  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const onInputChange = inputChange(validateInput);
  const onFocusOut = focusOut(validateInput);

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

        const response = await action(formatedData);
        setStatus(STATUS.success);
        setMessage(response.data.message);
        dispatch({
          type: RESET_FORM,
        });
      }

      // setFormData({ key: 'reset' });
    } catch (error) {
      console.log(error);
      setStatus(STATUS.fail);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (memberData) {
      for (const key in memberData) {
        if (Object.hasOwnProperty.call(memberData, key)) {
          const value = memberData[key];
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
  }, [memberData]);
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
            {Object.keys(formData).map((key) => {
              return (
                (formData[key].type === 'text' ||
                  formData[key].type === 'number') && (
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
          </S.InputsWrapper>
          <PrimaryButton type='submit' onClick={handleSubmit}>
            {buttonText}
          </PrimaryButton>
        </S.Form>
      </S.FormWrapper>
    </div>
  );
};

export default MemberForm;
