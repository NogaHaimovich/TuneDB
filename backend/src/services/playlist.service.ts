import User from "../models/users.js";
import mongoose from "mongoose";

const getUserPlaylists = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists");

  if (!user) return [];

  if (!user.playlists || user.playlists.length === 0) {
    user.playlists = [{
      name: "Favorites",
      tracks: []
    }] as any;
    await user.save();
  }

  return user.playlists.map(playlist => playlist.name);
};

const addTrackToPlaylist = async (
  userId: string,
  playlistName: string,
  track: {
    trackId: string;
    title?: string;
    artist?: string;
    album?: string;
    image?: string;
  }
) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId);
  if (!user) throw new Error("User not found");

  if (!user.playlists) user.playlists = [] as any;


  let playlist = user.playlists.find((p) => p.name === playlistName);

  if (!playlist) {
    user.playlists.push({
      name: playlistName,
      tracks: []
    } as any);
    playlist = user.playlists[user.playlists.length - 1];
  } else {
    console.log("Found existing playlist:", playlist);
  }

  if (!playlist) {
    throw new Error("Failed to create or find playlist");
  }

  if (!playlist.tracks) playlist.tracks = [] as any;

  const exists = playlist.tracks.some((t) => t.trackId === track.trackId);
  if (exists) throw new Error("Track already in playlist");

  playlist.tracks.push(track as any);

  await user.save();

  return playlist;
};

const createPlaylist = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId);
  if (!user) throw new Error("User not found");

  if (!user.playlists) user.playlists = [] as any;



  const existingPlaylist = user.playlists.find((p) => p.name === playlistName);
  if (existingPlaylist) throw new Error("Playlist already exists");

  const newPlaylist = {
    name: playlistName,
    tracks: []
  };

  user.playlists.push(newPlaylist as any);
  await user.save();
  return user.playlists[user.playlists.length - 1];
};

const getPlaylistSongs = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists");
  if (!user) throw new Error("User not found");

  const playlist = user.playlists?.find((p) => p.name === playlistName);
  if (!playlist) throw new Error("Playlist not found");

  return playlist.tracks || [];
};

const removePlaylist = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId);
  if (!user) throw new Error("User not found");

  if (!user.playlists) {
    throw new Error("User has no playlists");
  }

  const initialLength = user.playlists.length;
  user.playlists = user.playlists.filter((p: any) => p.name !== playlistName) as any;

  if (user.playlists.length === initialLength) {
    throw new Error("Playlist not found");
  }

  await user.save();
  
  return { message: "Playlist deleted successfully" };
};

const renamePlaylist = async (userId: string, oldName:string, newName:string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId);
  if (!user) throw new Error("User not found");

  if (!user.playlists) {
    throw new Error("User has no playlists");
  }

  const playlist = user.playlists.find((p: any) => p.name === oldName);
  if (!playlist) throw new Error("playlist not found")

  playlist.name = newName;
  await user.save();

  return { message: "Playlist renamed successfully" };

}

export { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs, removePlaylist, renamePlaylist};
