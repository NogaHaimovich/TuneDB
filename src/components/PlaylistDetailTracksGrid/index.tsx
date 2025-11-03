import Card from "../Card";
import type { PlaylistDetailTracksGridProp } from "./types";
import "./styles.scss";

const PlaylistDetailTracksGrid = ({
    playlist,
}: PlaylistDetailTracksGridProp) => {
  return (
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
  );
};

export default PlaylistDetailTracksGrid ;
