import React, { useEffect, useReducer, useState } from 'react';
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
import MultiSelect from '../../shared/FormMultiSelect';
import { useShows } from '../../../context/ShowsContext';

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

const ShowForm = ({ action, buttonText, headerText, showData }) => {
  const [formData, dispatch] = useReducer(formReducer, initialForm);
  const [status, setStatus] = useState(STATUS.init);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { allGenres } = useShows();
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
      } else {
        // form is valid
        const formatedData = {};
        for (const name in formData) {
          if (name === 'genres' && formData[name].label) {
            formatedData[name] = formData[name].value.map(
              (genre) => genre.value,
            );
          } else {
            formatedData[name] = formData[name].value;
          }
        }
        console.log('formatedData', formatedData);
        const response = await action(formatedData);
        setStatus(STATUS.success);
        setMessage(response.data.message);
      }

      // setFormData({ key: 'reset' });
    } catch (error) {
      setStatus(STATUS.fail);
      console.log(error.message);
      setMessage(error.message);
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
          if (key === 'genres') {
            const formatGenres = showData[key].map((genre) => {
              return { value: genre, label: genre };
            });
            setSelectedGenres(formatGenres);
          }
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
                    <React.Fragment key={key}>
                      {key === 'genres' ? (
                        <MultiSelect
                          options={allGenres}
                          data={formData[key]}
                          initialGenres={selectedGenres}
                          width={350}
                          id={key}
                          changed={(value) =>
                            onInputChange(key, value, dispatch, formData)
                          }
                          onFocusOut={(value) =>
                            onFocusOut(key, value, dispatch, formData)
                          }
                          isMulti
                          maxOptions={5}
                          key={key}
                        />
                      ) : (
                        <FormInput
                          changed={(e) =>
                            onInputChange(
                              key,
                              e.target.value,
                              dispatch,
                              formData,
                            )
                          }
                          key={key}
                          id={key}
                          data={formData[key]}
                          onFocusOut={(e) =>
                            onFocusOut(key, e.target.value, dispatch, formData)
                          }
                          width={350}
                        />
                      )}
                    </React.Fragment>
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
