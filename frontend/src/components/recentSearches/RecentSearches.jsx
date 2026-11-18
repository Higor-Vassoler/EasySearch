import "./RecentSearches.css";
import { X, Clock } from "lucide-react";

export default function RecentSearches({ recentSearches, onSelectPlayer, onRemovePlayer }) {
  return (
    <>
      <section className="recent-searches">
        <div className="recent-title">
          <Clock size={35} className="recent-title-icon" />
          <h2>Recent Searches</h2>
        </div>

        {recentSearches.length > 0 ? (
          <div className="recent-searches-list">
            {recentSearches.map((player) => (
              <div key={player.id} onClick={() => onSelectPlayer(player.username)} className="recent-player">
                <span>{player.username}</span>

                <button
                  type="button"
                  aria-label={`Remove ${player.username} from recent searches`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePlayer(player.id);
                  }}
                >
                  <X className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recent-searches">
            No recent searches yet.
          </p>
        )}
      </section>
    </>
  );
}