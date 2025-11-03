import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import "./styles.scss";
import AddToPlaylistIcon from "../../../assets/addToPlaylist.svg?react";
import { getUser } from "../../../Services/userService";
import { addToPlaylist } from "../../../Services/playlistService";
import PlaylistSelector from "../PlaylistSelector";

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

  const handleClick = () => {
    const user = getUser();
    
    if (!user) {
      window.location.href = "/signin";
      return;
    }

    setIsPlaylistSelectorOpen(true);
  };

  const handlePlaylistSelect = async (playlistName: string) => {
    try {
      await addToPlaylist(trackId, {
        title,
        artist,
        album,
        image
      }, playlistName);
      
      toast.success(`Track added to "${playlistName}"!`);
    } catch (error: any) {
      if (error.response?.data?.error === "Track already in playlist") {
        toast.error(`Track is already in "${playlistName}"!`);
      } else {
        toast.error("Failed to add track to playlist. Please try again.");
        console.error("Error adding track to playlist:", error);
      }
    }
  };

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
