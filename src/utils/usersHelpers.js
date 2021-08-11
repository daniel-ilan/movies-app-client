import { UPDATE_FORM } from './formHelpers';
const subscriptionsBoxes = [
  'createSubscriptions',
  'deleteSubscriptions',
  'updateSubscriptions',
];
const moviesBoxes = ['createMovies', 'deleteMovies', 'updateMovies'];

export const validateInput = (name, value) => {
  let hasError = false,
    error = '';
  console.log(name);
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

export const postValidation = (
  name,
  value,
  dispatch,
  hasError,
  error,
  isFormValid,
) => {
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
  } else if (name === 'viewSubscriptions' && !value) {
    for (const permission of subscriptionsBoxes) {
      dispatch({
        type: UPDATE_FORM,
        data: {
          name: permission,
          value: false,
          hasError,
          error,
          touched: false,
          isFormValid,
        },
      });
    }
  } else if (name === 'viewMovies' && !value) {
    for (const permission of moviesBoxes) {
      dispatch({
        type: UPDATE_FORM,
        data: {
          name: permission,
          value: false,
          hasError,
          error,
          touched: false,
          isFormValid,
        },
      });
    }
  }
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
