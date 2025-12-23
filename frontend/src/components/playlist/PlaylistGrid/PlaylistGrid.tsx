import type { PlaylistGridProps } from "./types";
import "./styles.scss";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

const PlaylistGrid = ({
  playlists,
  onEdit,
  onDelete,
  onViewMore,
  emptyMessage = "No playlists yet.",
  showActions = true,
}: PlaylistGridProps) => {
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
