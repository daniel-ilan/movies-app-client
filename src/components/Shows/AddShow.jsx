import React from 'react';
import ShowForm from './ShowsForm/ShowsForm';

const AddShow = () => {
  const URL = '/add-movie';
  const BUTTON_TEXT = 'Add Show';
  const HEADER_TEXT = 'New Show';
  return (
    <div>
      <ShowForm url={URL} buttonText={BUTTON_TEXT} headerText={HEADER_TEXT} />
    </div>
  );
};

export default AddShow;
