import { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Home from "./pages/home/Home.jsx";
import { Toaster } from "./components/ui/Toasts/Toasts.jsx";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");

    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  function addRecentSearches(username) {
    const newSearch = {
      id: Date.now(),
      username: username
    };

    setRecentSearches((p) => {
      const filteredSearches = p.filter(
        (search) => search.username !== username
      );

      const updatedSearches = [
        newSearch,
        ...filteredSearches
      ].slice(0, 5);

      return updatedSearches;
    });
  }

  function removeRecentSearches(id) {
    setRecentSearches((p) => {
      return p.filter((search) => search.id !== id)
    });
  }

  function clearRecentSearches() {
    setRecentSearches([]);
  }

  function handleSearch() {
    const username = searchValue.trim();

    if (!username) return;

    setSubmittedUsername(username);
    setSearchTrigger(prev => !prev);
    addRecentSearches(username);
  }

  async function getPlayerLiveMatch(username) {
    const usernameF = encodeURIComponent(username);
    const res = await fetch(`http://localhost:5000/api/player/live-match/${usernameF}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro ao buscar partida.");
    }

    return data;
  }

  return (
    <>
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
      />
      <Home
        recentSearches={recentSearches}
        onSelectPlayer={setSearchValue}
        onRemovePlayer={removeRecentSearches}
        onClearAll={clearRecentSearches}
        playerLiveMatch={getPlayerLiveMatch}
        submittedUsername={submittedUsername}
        searchTrigger={searchTrigger}
      />
      <Toaster />
    </>
  );
}