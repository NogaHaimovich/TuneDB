import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

import "./styles.scss";
import AddToPlaylistIcon from "../../../assets/addToPlaylist.svg?react";
import { getUser } from "../../../Services/userService";
import PlaylistSelector from "../PlaylistSelector";
import { useAddToPlaylistMutation } from "../../../store";

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

  const handleClick = () => {
    const user = getUser();
    
    if (!user) {
      window.location.href = "/signin";
      return;
    }

    setIsPlaylistSelectorOpen(true);
  };

  const handlePlaylistSelect = (playlistName: string) => {
    setLastPlaylistName(playlistName);
    addToPlaylist({
      trackId,
      trackData: {
        title,
        artist,
        album,
        image
      },
      playlistName
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
