import { useState, useEffect } from "react";
import { House, UserRound } from "lucide-react";
import SearchBar from "../searchBar/SearchBar.jsx";
import "./Header.css";

export default function Header({ searchValue, onSearchChange, onSearch }) {
  return (
    <header className="header">
      <div className="header-home">
        <House size={40} />
      </div>

      <SearchBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
      />

      <div className="header-profile">
        <UserRound size={40} />
      </div>
    </header>
  );
}