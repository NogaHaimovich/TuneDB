
import Card from "../Card";
import type { PlaylistDetailTracksGridProp } from "./types";
import "./styles.scss";

const PlaylistDetailTracksGrid = ({
    playlist, 
    loading = false, 
    error
}: PlaylistDetailTracksGridProp) => {
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

  return(
    <div className="playlist_detail_tracks_grid">
      <div className="tracks_grid">
        {playlist.tracks.map((track) => (
          <div key={track.trackId} className="track_item">
            <Card
              title={track.title}
              image={track.image}
              id={track.trackId}
              type="record"
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default PlaylistDetailTracksGrid ;
