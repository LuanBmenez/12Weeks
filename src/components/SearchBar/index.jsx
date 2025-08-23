import { Search } from "lucide-react";
import {
  SearchBarWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
} from "./style";

export default function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchInputWrapper>
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
        <SearchInput type="text" placeholder="Buscar salas..." />
      </SearchInputWrapper>
    </SearchBarWrapper>
  );
}

