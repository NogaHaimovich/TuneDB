import AddToPlaylistButton from "../AddToPlaylistButton";
import "./styles.scss";
import { Link } from "react-router-dom";
import type { AlbumTracksListProps } from "./types";

const AlbumTracksList = ({
    album,
}: AlbumTracksListProps) => {
  if (!album) return null;

  return (
    <div className="album_tracks_list">
      <h3 className="album_tracks_list_title">Songs:</h3>
      {album.tracks && album.tracks.length > 0 ? (
        <ol className="album_tracks_list_songs">
          {album.tracks.map((song) => (
            <li key={song.id} className="album_tracks_list_item">
              <Link to={`/record/${song.id}`}>
                {song.title}
              </Link>
              <AddToPlaylistButton 
                trackId={song.id.toString()}
                title={song.title}
                artist={album.artist.name}
                album={album.title}
                image={album.cover || album.image}
              />
            </li>
          ))}
        </ol>
      ) : (
        <p className="album_tracks_list_empty">No tracks available</p>
      )}
    </div>
  );
};

export default AlbumTracksList;
