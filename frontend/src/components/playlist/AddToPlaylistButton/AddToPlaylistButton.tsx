import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

import "./styles.scss";
import AddToPlaylistIcon from "../../../assets/addToPlaylist.svg?react";
import { isAuthenticated } from "../../../utils/auth";
import PlaylistSelector from "../PlaylistSelector/PlaylistSelector";
import { useAddToPlaylistMutation, useFetchAllPlaylistsDataQuery } from "../../../store";

interface AddToPlaylistButtonProps {
  trackId: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
}

const AddToPlaylistButton: React.FC<AddToPlaylistButtonProps> = ({ 
  trackId, 
  title, 
  artist, 
  album, 
  image 
}) => {
  const [isPlaylistSelectorOpen, setIsPlaylistSelectorOpen] = useState(false);
  const [lastPlaylistName, setLastPlaylistName] = useState<string>("");
  const [addToPlaylist, { isSuccess, isError, error }] = useAddToPlaylistMutation();
  const { data } = useFetchAllPlaylistsDataQuery();

  const handleClick = () => {
    if (!isAuthenticated()) {
      window.location.href = "/signin";
      return;
    }

    setIsPlaylistSelectorOpen(true);
  };

  const handlePlaylistSelect = (playlistId: string) => {
    const playlist = data?.playlists.find(p => p.id === playlistId);
    const playlistName = playlist?.name || "";
    setLastPlaylistName(playlistName);
    addToPlaylist({
      trackId,
      trackData: {
        title,
        artist,
        album,
        image
      },
      playlistId
    });
  };

  useEffect(() => {
    if (isSuccess && lastPlaylistName) {
      toast.success(`Track added to "${lastPlaylistName}"!`);
      setIsPlaylistSelectorOpen(false);
    }
  }, [isSuccess, lastPlaylistName]);

  useEffect(() => {
    if (isError) {
      const errorData = error && 'data' in error ? (error.data as any) : null;
      if (errorData?.error === "Track already in playlist") {
        toast.error(`Track is already in "${lastPlaylistName}"!`);
      } else {
        toast.error("Failed to add track to playlist. Please try again.");
        console.error("Error adding track to playlist:", error);
      }
    }
  }, [isError, error, lastPlaylistName]);

  const handleCloseSelector = () => {
    setIsPlaylistSelectorOpen(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <button 
        onClick={handleClick} 
        className="add_to_playlist_button"
        title="Add to playlist"
      >
        <AddToPlaylistIcon/>
      </button>
      
      <PlaylistSelector
        isOpen={isPlaylistSelectorOpen}
        onClose={handleCloseSelector}
        onSelectPlaylist={handlePlaylistSelect}
        trackTitle={title}
      />
    </>
  );
};

export default AddToPlaylistButton;
