import { useState, useEffect, act } from "react";
import "./MatchBoard.css";
import { toast } from "sonner";


export default function MatchBoard({ playerLiveMatch, submittedUsername, searchTrigger }) {
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
          toast.error(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchMatch();

    return () => {
      active = false;
    };
  }, [submittedUsername, searchTrigger]);

  const participants = matchData?.participants ?? [];

  // const blueTeam = participants.filter(player => players.teamId === 100);
  // const redTeam = participants.filter(player => players.teamId === 200);

  const blueTeam = [];
  const redTeam = [];

  for (const player in participants) {
    if (player.teamId === 100) {
      blueTeam = { ...player };
    } else {
      redTeam = { ...player };
    }
  }

  const playersBlue = [];
  const playersRed = [];

  // for (const player in blueTeam) {
  // ??????????????
  //   }

  return (
    <>
      {/* <div className="player blue">
          <p className="champion" >Mordekaiser</p>
          <a href="https://op.gg/pt/lol/summoners/br/MOCHIzera-br1" className="opgg-link" target="_blank">OPGG LINK</a>
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
                <a href="https://op.gg/pt/lol/summoners/br/MOCHIzera-br1" className="opgg-link" target="_blank">OPGG LINK</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}