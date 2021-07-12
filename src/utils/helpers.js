const subscriptionsBoxes = [
  'createSubscriptions',
  'deleteSubscriptions',
  'updateSubscriptions',
];
const moviesBoxes = ['createMovies', 'deleteMovies', 'updateMovies'];

export const STATUS = {
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  init: 'init',
};

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

  if (subscriptionsBoxes.includes(name) && value) {
    dispatch({
      type: UPDATE_FORM,
      data: {
        name: 'viewSubscriptions',
        value: true,
        hasError,
        error,
        touched: false,
        isFormValid,
      },
    });
  } else if (moviesBoxes.includes(name) && value) {
    dispatch({
      type: UPDATE_FORM,
      data: {
        name: 'viewMovies',
        value: true,
        hasError,
        error,
        touched: false,
        isFormValid,
      },
    });
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
    case 'username':
      if (value.trim() === '') {
        hasError = true;
        error = 'Username cannot be empty';
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = 'Invalid username. Please avoid Special characters';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'firstName':
      if (value.trim() === '') {
        hasError = true;
        error = 'First name cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'lastName':
      if (value.trim() === '') {
        hasError = true;
        error = 'Last name cannot be empty';
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
  firstName: {
    label: 'First Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  lastName: {
    label: 'Last Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  username: {
    label: 'User Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  sessionTimeOut: {
    label: 'Session time-out (In minutes)',
    value: '',
    type: 'number',
    touched: false,
    hasError: true,
    error: '',
  },
  viewSubscriptions: {
    label: 'View Subscriptions',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  createSubscriptions: {
    label: 'Create Subscriptions',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  deleteSubscriptions: {
    label: 'Delete Subscriptions',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  updateSubscriptions: {
    label: 'Update Subscriptions',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  viewMovies: {
    label: 'View Movies',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  createMovies: {
    label: 'Create Movies',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  deleteMovies: {
    label: 'Delete Movies',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  updateMovies: {
    label: 'Update Movies',
    value: false,
    type: 'checkbox',
    touched: false,
    hasError: true,
    error: '',
  },
  isFormValid: false,
};
