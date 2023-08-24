import { CiSearch } from 'react-icons/ci';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <CiSearch size={22} />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};
