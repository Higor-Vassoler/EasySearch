import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ searchValue, onSearchChange, onSearch }) {
  // const [search, setSearch] = useState("");

  return (
    <div className="searchBar">
      <Search size={30} />
      <input
        type="text"
        placeholder="Insira o nome do jogador... Ex: Faker#KR1"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
    </div>
  );
}