import User from "../models/users.js";
import mongoose from "mongoose";

const getUserPlaylists = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists");

  if (!user) return [];

  if (!user.playlists || user.playlists.length === 0) {
    user.playlists = [{
      name: "favorite",
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

  console.log("User playlists before search:", user.playlists.map(p => p.name));
  console.log("Looking for playlist:", playlistName);

  let playlist = user.playlists.find((p) => p.name === playlistName);

  if (!playlist) {
    console.log("Playlist not found, creating new one:", playlistName);
    // Create the playlist if it doesn't exist
    user.playlists.push({
      name: playlistName,
      tracks: []
    } as any);
    playlist = user.playlists[user.playlists.length - 1];
    console.log("Created playlist:", playlist);
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

  console.log("Creating playlist:", playlistName, "for user:", userId);
  console.log("User playlists before creation:", user.playlists.map(p => p.name));

  const existingPlaylist = user.playlists.find((p) => p.name === playlistName);
  if (existingPlaylist) throw new Error("Playlist already exists");

  const newPlaylist = {
    name: playlistName,
    tracks: []
  };

  user.playlists.push(newPlaylist as any);
  await user.save();

  console.log("Playlist created successfully:", newPlaylist);
  console.log("User playlists after creation:", user.playlists.map(p => p.name));

  return user.playlists[user.playlists.length - 1];
};

export { getUserPlaylists, addTrackToPlaylist, createPlaylist };
