import React, { useState } from 'react';
import { useShows } from '../../../context/ShowsContext';
import FormInput from '../../shared/FormInput';
import { PrimaryButton } from '../../shared/Buttons';
import { useSubscriptions } from '../../../context/SubscriptionsContext';
import * as S from './styled';
const LABEL_TEXT = 'Search a show';
const DATE_LABEL_TEXT = 'Pick a date';

export function SelectedShow({ member, onSubmit }) {
  const { allShows } = useShows();
  const [renderShows, setRenderShows] = useState(allShows);
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState(
    new Date().toLocaleDateString('en-CA'),
  );

  const { addNewSubscription } = useSubscriptions();

  const [selectedShow, setSelectedShow] = useState(null);

  const onSearchInputChange = (e) => {
    const val = e.target.value;
    const filteredShows = allShows.filter((show) =>
      show.name.toLowerCase().includes(val.toLowerCase()),
    );
    setRenderShows(filteredShows);
    setSearchValue(val);
  };

  const onDateInputChange = (e) => {
    const val = e.target.value;
    setDateValue(val);
  };

  const handleSubscribe = () => {
    const data = { show: selectedShow, date: dateValue, member };
    addNewSubscription(data)
      .then(() => {
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputData = { value: searchValue, label: LABEL_TEXT, type: 'text' };
  const dateInputData = {
    value: dateValue,
    label: DATE_LABEL_TEXT,
    type: 'date',
  };
  return (
    <>
      {!selectedShow ? (
        <>
          <FormInput data={inputData} changed={onSearchInputChange} />
          {renderShows.map((show) => {
            return (
              <S.MovieItem key={show._id} onClick={() => setSelectedShow(show)}>
                {show.name}
              </S.MovieItem>
            );
          })}
        </>
      ) : (
        <S.SelectedShowWrapper>
          <S.ShowWrapper>
            <S.FlexChildContainer>
              <img src={selectedShow.image} width='100%' alt='' />
            </S.FlexChildContainer>
            <S.FlexChildContainer>
              <S.ShowTitle>{selectedShow.name}</S.ShowTitle>
              <FormInput
                data={dateInputData}
                changed={onDateInputChange}
                width='100%'
              />
            </S.FlexChildContainer>
          </S.ShowWrapper>
          <PrimaryButton onClick={handleSubscribe}>Subscribe</PrimaryButton>
        </S.SelectedShowWrapper>
      )}
    </>
  );
}
