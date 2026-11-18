import { useState } from "react";
import "./Home.css";
import RecentSearches from "../../components/recentSearches/RecentSearches";

export default function Home({ recentSearches, onSelectPlayer, onRemovePlayer }) {

  return (
    <main className="home">
      <section className="home-hero">
        <h1>Easy<span>Search</span></h1>
        <p>Your team on the radar.</p>
      </section>

      <RecentSearches
        recentSearches={recentSearches}
        onSelectPlayer={onSelectPlayer}
        onRemovePlayer={onRemovePlayer}
      />
    </main>
  );
}