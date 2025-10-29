import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlaylistsData, type PlaylistWithTracks } from "../../Services/playlistService";
import Card from "../../components/Card";
import "./styles.scss";

const PlaylistDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [playlist, setPlaylist] = useState<PlaylistWithTracks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { playlists } = await getAllPlaylistsData();
        if (isMounted) {
          const foundPlaylist = playlists.find(p => 
            p.name === decodeURIComponent(name || '')
          );
          if (foundPlaylist) {
            setPlaylist(foundPlaylist);
          } else {
            setError("Playlist not found");
          }
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || "Failed to load playlist");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [name]);

  if (loading) return <div className="playlist_page"><p>Loading playlist...</p></div>;
  if (error) return <div className="playlist_page"><p>{error}</p></div>;
  if (!playlist) return <div className="playlist_page"><p>Playlist not found</p></div>;

  return (
    <div className="playlist_page">
      <div className="playlist_header">
        <h1 className="playlist_name">{playlist.name}</h1>
        <span className="track_count">{playlist.tracks.length} tracks</span>
      </div>

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