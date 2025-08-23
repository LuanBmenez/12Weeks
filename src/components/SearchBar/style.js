import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  flex: 1;
  max-width: 24rem;
  margin: 0 2rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s;
  &:focus { 
    outline: none; 
    border-color: #2563eb; 
    box-shadow: 0 0 0 2px #2563eb33; 
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

