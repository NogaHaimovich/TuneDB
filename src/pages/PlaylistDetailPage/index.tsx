import Card from "../../components/Card";
import PlaylistDetailsHeader from "../../components/PlaylistDetailsHeader";
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
      )}
    </div>
  );
};

export default PlaylistDetailPage; 