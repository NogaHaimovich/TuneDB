import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPlaylistsData, type PlaylistWithTracks } from "../../Services/playlistService";
import "./styles.scss";
import Card from "../../components/Card";

const MyPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<PlaylistWithTracks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { playlists } = await getAllPlaylistsData();
        if (isMounted) setPlaylists(playlists);
      } catch (err: any) {
        if (isMounted) setError(err?.message || "Failed to load playlists");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="playlists_page"><p>Loading playlists...</p></div>;
  if (error) return <div className="playlists_page"><p>{error}</p></div>;

  return (
    <div className="playlists_page">
      <h1>My Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists yet.</p>
      ) : (
        <div className="playlists_list">
          {playlists.map((p) => {
            const visibleTracks = p.tracks.slice(0, 5); 

            return (
              <div key={p.name} className="playlist_card">
                <div className="playlist_header">
                  <Link to={`/playlist/${encodeURIComponent(p.name)}`} className="playlist_name">{p.name}</Link>
                  <span className="track_count">{p.tracks.length} tracks</span>
                </div>

                {p.tracks.length === 0 ? (
                  <p>No tracks</p>
                ) : (
                  <>
                    <ul className="tracks_list">
                      {visibleTracks.map((t) => (
                        <li key={t.trackId} className="track_item">
                          <Card
                            title={t.title}
                            image={t.image}
                            id={t.trackId}
                            type="record"
                          />
                        </li>
                      ))}
                    </ul>
                    {p.tracks.length > 5 && (
                      <button
                        className="see_more_btn"
                        onClick={() => navigate(`/playlist/${encodeURIComponent(p.name)}`)}
                      >
                        See More
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPlaylistsPage;
