export const UPDATE_FORM = 'UPDATE_FORM';
export const RESET_FORM = 'RESET_FORM';
export const STATUS = {
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  init: 'init',
};

export const initForm = (initialForm) => {
  return function formReducer(state, action) {
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
};

export const inputChange = (validationFunc, postValidationFunc = null) => {
  return function onInputChange(name, value, dispatch, formData) {
    const { hasError, error } = validationFunc(name, value);
    let isFormValid = true;
    for (const key in formData) {
      const item = formData[key];
      // Check if the current field has error
      if (key === name && hasError) {
        isFormValid = false;
      } else if (key !== name && item.hasError) {
        // Check if any other field has error
        isFormValid = false;
      }
    }

    dispatch({
      type: UPDATE_FORM,
      data: { name, value, hasError, error, touched: false, isFormValid },
    });

    if (postValidationFunc) {
      postValidationFunc(name, value, dispatch, hasError, error, isFormValid);
    }
  };
};

export const focusOut = (validationFunc) => {
  return function onFocusOut(name, value, dispatch, formData) {
    const { hasError, error } = validationFunc(name, value);

    let isFormValid = true;
    for (const key in formData) {
      const item = formData[key];
      if (key === name && hasError) {
        isFormValid = false;
      } else if (key !== name && item.hasError) {
        isFormValid = false;
      }
    }
    dispatch({
      type: UPDATE_FORM,
      data: { name, value, hasError, error, touched: true, isFormValid },
    });
  };
};
