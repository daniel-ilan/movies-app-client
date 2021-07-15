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

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const validateInput = (name, value) => {
  let hasError = false,
    error = '';
  switch (name) {
    case 'movieName':
      if (value.trim() === '') {
        hasError = true;
        error = 'Username cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'genres':
      if (value.trim() === '') {
        hasError = true;
        error = 'First name cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'imageUrl':
      if (value.trim() === '') {
        hasError = true;
        error = 'Last name cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'premired':
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
  movieName: {
    label: 'Name',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },

  premired: {
    label: 'Premired',
    value: '',
    type: 'date',
    touched: false,
    hasError: true,
    error: '',
  },
  rating: {
    label: 'Rating',
    value: 0,
    type: 'number',
    touched: false,
    hasError: true,
    error: '',
  },
  imageUrl: {
    label: 'Image url',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  genres: {
    label: 'Genres',
    value: '',
    type: 'text',
    touched: false,
    hasError: true,
    error: '',
  },
  summary: {
    label: 'Summary',
    value: '',
    type: 'textarea',
    touched: false,
    hasError: true,
    error: '',
  },

  isFormValid: false,
};
