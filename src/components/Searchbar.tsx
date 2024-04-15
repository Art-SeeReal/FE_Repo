import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e58ae6;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  flex: 7;
  border: none;
  &:focus {
    border-color: #b249c6;
  }
`;

const SearchButton = styled.button`
  background-color: #e58ae6;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  flex: 3;
  margin-left: 10px;

  &:hover {
    background-color: #b249c6;
  }
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
