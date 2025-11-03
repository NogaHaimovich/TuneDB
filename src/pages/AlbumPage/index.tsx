import "./styles.scss";
import { Link, useParams } from "react-router-dom";
import AddToPlaylistButton from "../../components/AddToPlaylistButton";
import useAlbumData from "../../hooks/useAlbumData";
import AlbumHeader from "../../components/AlbumHeader";

const AlbumPage = () => {
  const { id: album_id } = useParams<{ id: string }>();

  const { album, loading, error } = useAlbumData(album_id)

  if (!album_id) return <p>No album ID provided.</p>;
  if (loading) return <p>Loading album...</p>;
  if (error) return <p>Error loading album: {error}</p>;
  if (!loading && !album) return <p>No data found for this album.</p>;

  return (
    <div className="album_page">
      <AlbumHeader
        album={album}
      />
      <div className="album_page_songs_grid">
         <h3>Songs:</h3>
          {album?.tracks && album.tracks.length > 0 && (
            <ol className="album_page_song_list">
              {album.tracks.map((song) => (
                <li key={song.id} className="album_page_song_item">
                  <Link to={`/record/${song.id}`}>
                    {song.title}
                  </Link>
                  <AddToPlaylistButton 
                    trackId={song.id.toString()}
                    title={song.title}
                    artist={album.artist.name}
                    album={album.title}
                    image={album.cover}
                  />
                </li>
              ))}
            </ol>
          )}
      </div>
    </div>
  );
};

export default AlbumPage;
