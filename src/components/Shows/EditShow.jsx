import React from 'react';
import ShowForm from './ShowsForm/ShowsForm';
import { useParams } from 'react-router-dom';
import { useShows } from '../../context/ShowsContext';

const EditShow = () => {
  const BUTTON_TEXT = 'Update Show';
  const HEADER_TEXT = 'Edit Show';
  let { showId } = useParams();
  const { initShows, editShow } = useShows();
  const showData = initShows.find((show) => show._id === showId);

  return (
    <div>
      <ShowForm
        action={editShow}
        buttonText={BUTTON_TEXT}
        headerText={HEADER_TEXT}
        showData={showData}
      />
    </div>
  );
};

export default EditShow;
