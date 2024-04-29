import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e58ae6;
  border-radius: 0.8rem;
  font-size: var(--text-body-1);
`;

const SearchInput = styled.input`
  flex: 7;
  padding: 0.75em 1em;
  border-radius: 0.8rem;
  outline: none;
  border: none;
`;

const SearchButton = styled.button`
  flex: 3;
  padding: 0.75em 1em;
  border: none;
  background-color: #e58ae6;
  color: #fff;
  font-size: var(--text-body-1);
`;

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add onKeyDown event handler
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
