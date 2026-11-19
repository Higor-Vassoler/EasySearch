import { useState, useEffect, act } from "react";
import "./MatchBoard.css";


export default function MatchBoard({ playerLiveMatch, submittedUsername }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!submittedUsername.trim()) {
      setMatchData(null);
      setLoading(false);
      return;
    }

    let active = true;

    async function fetchMatch() {
      setLoading(true);
      setMatchData(null);

      try {
        const data = await playerLiveMatch(submittedUsername);

        if (active) {
          setMatchData(data);
        }
      } catch (error) {
        if (active) {
          setMatchData(null);
          console.error(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchMatch();
  }, [submittedUsername]);

  const participants = matchData?.participants ?? [];

  const blueTeam = participants.filter(player => player.teamId === 100);
  const redTeam = participants.filter(player => player.teamId === 200);

  return (
    <>
      {/* <div className="player blue">
          <p className="champion" >Mordekaiser</p>
          <a href="https://linkqualquer.com.br" className="opgg-link" target="_blank">OPGG LINK</a>
        </div> */}

      {loading && (
        <p className="match-loading">
          Buscando partida...
        </p>
      )}

      {matchData && (
        <div className="main-matchboard">
          <div className="blue-team">
            {blueTeam.map(player => (
              <div className="player blue" key={player.puuid}>
                {player.championName}
              </div>
            ))}
          </div>

          <div className="red-team">
            {redTeam.map(player => (
              <div className="player red" key={player.puuid}>
                {player.championName}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}