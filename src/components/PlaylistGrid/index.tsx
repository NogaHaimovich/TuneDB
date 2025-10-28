import PlaylistCard from "../PlaylistCard";
import type { PlaylistGridProps } from "./types";
import "./styles.scss";

const PlaylistGrid = ({
  playlists,
  loading = false,
  error,
  onEdit,
  onDelete,
  onViewMore,
  emptyMessage = "No playlists yet.",
  showActions = true
}: PlaylistGridProps) => {
  if (loading) {
    return (
      <div className="playlist_grid">
        <div className="loading_state">
          <p>Loading playlists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="playlist_grid">
        <div className="error_state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="playlist_grid">
        <div className="empty_state">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlist_grid">
      <div className="playlists_list">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.name}
            playlist={playlist}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewMore={onViewMore}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistGrid;
