import React from 'react';
import ShowForm from './ShowsForm/ShowsForm';
import { useShows } from '../../context/ShowsContext';

const AddShow = () => {
  const BUTTON_TEXT = 'Add Show';
  const HEADER_TEXT = 'New Show';
  const { addNewShow } = useShows();
  return (
    <div>
      <ShowForm
        action={addNewShow}
        buttonText={BUTTON_TEXT}
        headerText={HEADER_TEXT}
      />
    </div>
  );
};

export default AddShow;
