import User from "../models/users.js";
import mongoose from "mongoose";
import type { Playlist, PlaylistTrack, UserWithPlaylists } from "./types.js";

type Savable = { save: () => Promise<unknown> };

const getUserPlaylists = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists") as (UserWithPlaylists & Savable | null);

  if (!user) return [];

  if (!user.playlists || user.playlists.length === 0) {
    user.playlists = [{
      name: "Favorites",
      tracks: []
    } as Playlist];
    await user.save();
  }

  return (user.playlists as Playlist[]).map(playlist => playlist.name);
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
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new Error("User not found");

  if (!user.playlists) user.playlists = [] as Playlist[];


  let playlist = (user.playlists as Playlist[]).find((p) => p.name === playlistName);

  if (!playlist) {
    (user.playlists as Playlist[]).push({
      name: playlistName,
      tracks: []
    });
    playlist = (user.playlists as Playlist[])[(user.playlists as Playlist[]).length - 1];
  } else {
    console.log("Found existing playlist:", playlist);
  }

  if (!playlist) {
    throw new Error("Failed to create or find playlist");
  }

  if (!playlist.tracks) playlist.tracks = [] as PlaylistTrack[];

  const exists = playlist.tracks.some((t) => t.trackId === track.trackId);
  if (exists) throw new Error("Track already in playlist");

  playlist.tracks.push(track as PlaylistTrack);

  await user.save();

  return playlist;
};

const createPlaylist = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new Error("User not found");

  if (!user.playlists) user.playlists = [] as Playlist[];



  const existingPlaylist = (user.playlists as Playlist[]).find((p) => p.name === playlistName);
  if (existingPlaylist) throw new Error("Playlist already exists");

  const newPlaylist = {
    name: playlistName,
    tracks: []
  };

  (user.playlists as Playlist[]).push(newPlaylist as Playlist);
  await user.save();
  return (user.playlists as Playlist[])[(user.playlists as Playlist[]).length - 1];
};

const getPlaylistSongs = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists") as (UserWithPlaylists & Savable | null);
  if (!user) throw new Error("User not found");

  const playlist = (user.playlists as Playlist[] | undefined)?.find((p) => p.name === playlistName);
  if (!playlist) throw new Error("Playlist not found");

  return playlist.tracks || [];
};

const removePlaylist = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new Error("User not found");

  if (!user.playlists) {
    throw new Error("User has no playlists");
  }

  const initialLength = user.playlists.length;
  user.playlists = (user.playlists as Playlist[]).filter((p: Playlist) => p.name !== playlistName);

  if (user.playlists.length === initialLength) {
    throw new Error("Playlist not found");
  }

  await user.save();
  
  return { message: "Playlist deleted successfully" };
};

const renamePlaylist = async (userId: string, oldName:string, newName:string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new Error("User not found");

  if (!user.playlists) {
    throw new Error("User has no playlists");
  }

  const playlist = (user.playlists as Playlist[]).find((p: Playlist) => p.name === oldName);
  if (!playlist) throw new Error("playlist not found")

  playlist.name = newName;
  await user.save();

  return { message: "Playlist renamed successfully" };

}

export { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs, removePlaylist, renamePlaylist};
