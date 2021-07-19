import React from 'react';
import ShowForm from './ShowsForm/ShowsForm';
import { useParams } from 'react-router-dom';

const EditShow = ({ allMovies }) => {
  const URL = '/edit-movie';
  const BUTTON_TEXT = 'Update Show';
  const HEADER_TEXT = 'Edit Show';
  let { showId } = useParams();
  const showData = allMovies.find((show) => show._id === showId);
  return (
    <div>
      <ShowForm
        url={URL}
        buttonText={BUTTON_TEXT}
        headerText={HEADER_TEXT}
        showData={showData}
      />
    </div>
  );
};

export default EditShow;
