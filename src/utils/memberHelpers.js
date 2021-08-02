export const STATUS = {
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  init: 'init',
};

const emailReg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

export const UPDATE_FORM = 'UPDATE_FORM';
export const RESET_FORM = 'RESET_FORM';

export const onInputChange = (name, value, dispatch, formData) => {
  const { hasError, error } = validateInput(name, value);
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
};

export const validateInput = (name, value) => {
  let hasError = false,
    error = '';
  switch (name) {
    case 'name':
      if (value.trim() === '') {
        hasError = true;
        error = 'Name cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'city':
      if (value.trim() === '') {
        hasError = true;
        error = 'City cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'email':
      if (value.trim() === '') {
        hasError = true;
        error = 'Email cannot be empty';
      } else if (!emailReg.test(value)) {
        hasError = true;
        error = 'Please provide a valid email address';
      } else {
        hasError = false;
        error = '';
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const onFocusOut = (name, value, dispatch, formData) => {
  const { hasError, error } = validateInput(name, value);
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

export const initialForm = {
  name: {
    label: 'Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  city: {
    label: 'City',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  email: {
    label: 'Email',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  isFormValid: false,
};
