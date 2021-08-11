export const validateInput = (name, value) => {
  let hasError = false,
    error = '';
  switch (name) {
    case 'name':
      if (value.trim() === '') {
        hasError = true;
        error = 'Username cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'genres':
      if (value.length === 0) {
        hasError = true;
        error = 'Genres can not be empty';
      } else if (value.length > 6) {
        hasError = true;
        error = 'Please select up to 6 Genres';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'image':
      if (value.trim() === '') {
        hasError = true;
        error = 'Image cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'premiered':
      if (value.trim() === '') {
        hasError = true;
        error = 'Premiered date cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'summary':
      if (value.trim() === '') {
        hasError = true;
        error = 'Summary cannot be empty';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'rating':
      if (value.toString().trim() === '') {
        hasError = true;
        error = 'Rating cannot be empty';
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

  premiered: {
    label: 'Premiered',
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
  image: {
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
