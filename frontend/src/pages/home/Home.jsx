import "./Home.css";
import RecentSearches from "../../components/recentSearches/RecentSearches";
import MatchBoard from "../../components/matchboard/MatchBoard";

export default function Home({ recentSearches, onSelectPlayer, onRemovePlayer, onClearAll, playerLiveMatch, submittedUsername }) {

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
        onClearAll={onClearAll}
      />

      <MatchBoard
        playerLiveMatch={playerLiveMatch}
        submittedUsername={submittedUsername}
      />
    </main>
  );
}