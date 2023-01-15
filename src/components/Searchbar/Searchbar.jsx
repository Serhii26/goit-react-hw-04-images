import { useState } from 'react';

import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchSpan,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const searchResult = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      return alert(' You must enter a keyword');
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchSpan>Search</SearchSpan>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={searchResult}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
