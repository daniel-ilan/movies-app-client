export const validateAuthInputs = (name, value) => {
  let hasError = false,
    error = '';
  switch (name) {
    case 'username':
      if (value.trim() === '') {
        hasError = true;
        error = 'Username cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'password':
      if (value.length === 0) {
        hasError = true;
        error = 'Password can not be empty';
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
  username: {
    label: 'User Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  password: {
    label: 'Password',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  isFormValid: false,
};
