import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getUserPlaylists } from "../../../Services/playlistService";
import { createPlaylist } from "../../../Services/playlistService";

interface PlaylistSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlaylist: (playlistName: string) => void;
  trackTitle?: string;
}

const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({
  isOpen,
  onClose,
  onSelectPlaylist,
  trackTitle
}) => {
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen]);

  const fetchPlaylists = async () => {
    setLoading(true);
    setError(null);
    try {
      const playlistsData = await getUserPlaylists();
      setPlaylists(playlistsData);
    } catch (err) {
      setError("Failed to load playlists");
      console.error("Error fetching playlists:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaylistSelect = (playlistName: string) => {
    onSelectPlaylist(playlistName);
    onClose();
  };

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    setCreating(true);
    setError(null);
    try {
      await createPlaylist(newPlaylistName.trim());
      await fetchPlaylists(); 
      setNewPlaylistName("");
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create playlist");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="playlist-selector-overlay" onClick={onClose}>
      <div className="playlist-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="playlist-selector-header">
          <h3>Add to Playlist</h3>
          {trackTitle && <p className="track-title">"{trackTitle}"</p>}
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="playlist-selector-content">
          {loading ? (
            <div className="loading">Loading playlists...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="playlist-list">
                {playlists.map((playlist) => (
                  <button
                    key={playlist}
                    className="playlist-item"
                    onClick={() => handlePlaylistSelect(playlist)}
                  >
                    <span className="playlist-name">{playlist}</span>
                  </button>
                ))}
              </div>
              
              {showCreateForm ? (
                <form onSubmit={handleCreatePlaylist} className="create-playlist-form">
                  <div className="form-group">
                    <input
                      type="text"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="Enter playlist name"
                      className="playlist-name-input"
                      autoFocus
                    />
                    <div className="form-actions">
                      <button type="submit" disabled={creating || !newPlaylistName.trim()}>
                        {creating ? "Creating..." : "Create"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewPlaylistName("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <button 
                  className="create-playlist-button"
                  onClick={() => setShowCreateForm(true)}
                >
                  + Create New Playlist
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelector;
