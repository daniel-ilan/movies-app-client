import React, { useReducer, useState } from 'react';
import { useAuth } from '../../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';
import * as S from '../styled';
import { PrimaryButton } from '../../shared/Buttons';
import { FormModal } from '../../shared/Modals';
import FormInput from '../../shared/FormInput';
import {
  initForm,
  UPDATE_FORM,
  STATUS,
  focusOut,
  inputChange,
} from '../../../utils/formHelpers';
import { initialForm, validateAuthInputs } from '../../../utils/authHelpers';

const SignUp = () => {
  const formReducer = initForm(initialForm);

  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const onInputChange = inputChange(validateAuthInputs);
  const onFocusOut = focusOut(validateAuthInputs);

  const { signUp } = useAuth();
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.loading);
    let isFormValid = true;
    try {
      for (const name in formData) {
        const item = formData[name];
        const { value } = item;
        const { hasError, error } = validateAuthInputs(name, value);
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
        const userData = await signUp(
          formatedData.username,
          formatedData.password,
        );

        setStatus(STATUS.success);
        if (userData) {
          window.localStorage.setItem('token', userData.token);
          window.localStorage.setItem('id', userData.id);
          window.localStorage.setItem('username', userData.username);
          history.push('/main');
        }
      }
    } catch (error) {
      setStatus(STATUS.fail);
      setMessage(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <FormModal status={status} setStatus={setStatus} message={message} />

      <S.FormWrapper>
        <S.StyledHeader>Sign up</S.StyledHeader>
        <S.FormHeader>
          {showError && !formData.isFormValid && (
            <S.FormError>Please fill all the fields correctly</S.FormError>
          )}
        </S.FormHeader>
        <S.StyledForm onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => {
            return (
              formData[key].type === 'text' && (
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
                  width='100%'
                />
              )
            );
          })}
          <PrimaryButton type='submit'>Sign up</PrimaryButton>
        </S.StyledForm>
        <S.FormFooter>
          <h4>Already a user?</h4> <Link to='login'>Login</Link>
        </S.FormFooter>
      </S.FormWrapper>
    </>
  );
};

export default SignUp;
