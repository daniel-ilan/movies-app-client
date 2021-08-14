import React, { useState, useEffect } from 'react';
import * as S from './styled';
import { mdiMagnify } from '@mdi/js';
import { useShows } from '../../../context/ShowsContext';
import CreatableSelect from 'react-select/creatable';

const ShowControls = () => {
  const { allGenres, filterShows } = useShows();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchGenres, setSearchGenres] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchName(value);
    filterShows(value, searchGenres);
  };

  const handleSelectGenre = (newValue) => {
    const value = newValue.map((val) => val.value);
    setSearchGenres(value);
    filterShows(searchName, value);
    setSelectedGenres(newValue);
  };

  useEffect(() => {
    const formatGenres = allGenres.map((genre) => {
      if (genre && genre.value) {
        return genre;
      }
      return { value: genre, label: genre };
    });
    setGenres(formatGenres);
  }, [allGenres]);

  return (
    <S.SideNav>
      <S.SearchShow>
        <S.StyledInput placeholder='Search Shows...' onChange={handleChange} />
        <S.StyledIcon
          path={mdiMagnify}
          title='User Profile'
          size={1}
          color='hsl(0deg 0% 44%)'
        />
      </S.SearchShow>
      <S.SearchGenres>
        <CreatableSelect
          isMulti
          onChange={handleSelectGenre}
          options={genres}
          styles={S.colourStyles}
          closeMenuOnSelect={false}
          value={selectedGenres}
        />
      </S.SearchGenres>
    </S.SideNav>
  );
};

export default ShowControls;
