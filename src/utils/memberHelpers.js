const emailReg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

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
