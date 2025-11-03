import PlaylistDetailsHeader from "../../components/playlist/PlaylistDetailsHeader";
import PlaylistDetailTracksGrid from "../../components/playlist/PlaylistDetailTracksGrid";
import usePlaylistDetails from "../../hooks/usePlaylistDetails";
import "./styles.scss";

const PlaylistDetailPage = () => {
  const {
      playlist,
      loading,
      error,
  } = usePlaylistDetails();


  if (loading) return <div className="playlist_page"><p>Loading playlist...</p></div>;
  if (error) return <div className="playlist_page"><p>{error}</p></div>;
  if (!playlist) return <div className="playlist_page"><p>Playlist not found</p></div>;

  return (
    <div className="playlist_page">
      <PlaylistDetailsHeader
        name = {playlist.name}
        tracksCount = {playlist.tracks.length}
      />

      {playlist.tracks.length === 0 ? (
        <p>No tracks in this playlist</p>
      ) : (
        <PlaylistDetailTracksGrid
          playlist={playlist}
        />
      )}
    </div>
  );
};

export default PlaylistDetailPage; 