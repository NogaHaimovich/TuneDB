import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPlaylistsData, removePlaylistClicked, renamePlaylist, type PlaylistWithTracks } from "../../Services/playlistService";
import { toast } from "react-hot-toast";
import "./styles.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";

const MyPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<PlaylistWithTracks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupError, setPopupError] = useState<string>("");

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

  const handleRemovePlaylistClicked = async (playlistName: string) => {
    if (!confirm(`Are you sure you want to delete "${playlistName}"?`)) {
      return;
    }

    try {
      await removePlaylistClicked(playlistName);
      toast.success('Playlist removed successfully');
      
      const { playlists } = await getAllPlaylistsData();
      setPlaylists(playlists);
    } catch (error: any) {
      toast.error('Error removing the playlist');
      console.error(`Error removing ${playlistName}: `, error);
    }
  }

  const handleSaveClicked = async(editingPlaylist: string) =>{
    if (!newName.trim()) {
        setPopupError("Playlist name cannot be empty");
    }
    try {
      await renamePlaylist(editingPlaylist, newName)
      const { playlists } = await getAllPlaylistsData();
      setPlaylists(playlists)
      setEditingPlaylist("");
      setNewName("");
      setPopupError("");
      setIsPopupOpen(false);
    } catch (error:any){
      setPopupError(error?.response?.data?.error || "Error renaming playlist");
      console.error("Rename playlist error:", error);
    }
  }

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
                  <div className="playlist_title_row">
                    <Link
                      to={`/playlist/${encodeURIComponent(p.name)}`}
                      className="playlist_name"
                    >
                      {p.name}
                    </Link>

                    <button
                      className="edit_playlist_btn"
                      title="Edit playlist name"
                      onClick={() => {
                        setEditingPlaylist(p.name);
                        setNewName(p.name);
                        setIsPopupOpen(true);
                      }}
                    >
                      🖊️
                    </button>
                  </div>
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

                    <div className="buttons_line">
                      {p.tracks.length > 5 && (
                        <Button
                          variant="primary"
                          className="see_more_btn"
                          onClick={() =>
                            navigate(`/playlist/${encodeURIComponent(p.name)}`)
                          }
                        >
                          See More
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        className="delete_playlist_btn"
                        onClick={() => handleRemovePlaylistClicked(p.name)}
                      >
                        Delete Playlist
                      </Button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isPopupOpen && (
        <div
          className="popup_overlay"
          onClick={() => {
            setIsPopupOpen(false);
            setEditingPlaylist(null);
            setPopupError("")
          }}
        >
          <div
            className="popup_box"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2>Edit Playlist Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new playlist name"
              className="popup_input"
            />
            {popupError && <p className="popup_error">{popupError}</p>}
            <div className="popup_buttons">
              <Button
                variant="primary"
                className="save_btn"
                onClick={() => handleSaveClicked(editingPlaylist!)}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className="cancel_btn"
                onClick={() => {
                  setIsPopupOpen(false);
                  setEditingPlaylist(null);
                  setPopupError("")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaylistsPage;
