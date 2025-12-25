import User from "../models/users.model.js";
import mongoose from "mongoose";
import type { UserWithPlaylists, Playlist, PlaylistTrack } from "../types/types.js";
import { AppError } from "../middleware/errorHandler.js";

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

  return (user.playlists as Playlist[]).map(playlist => ({
    id: (playlist as any)._id?.toString() || (playlist as any).id,
    name: playlist.name
  }));
};

const addTrackToPlaylist = async (
  userId: string,
  playlistId: string,
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
  if (!user) throw new AppError("User not found", 404);

  if (!user.playlists) user.playlists = [] as Playlist[];

  const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
  let playlist = (user.playlists as any[]).find((p) => 
    p._id?.toString() === playlistId || p.id === playlistId || p._id?.equals(playlistObjectId)
  );

  if (!playlist) {
    throw new AppError("Playlist not found", 404);
  }

  if (!playlist.tracks) playlist.tracks = [] as PlaylistTrack[];

  const exists = playlist.tracks.some((t: PlaylistTrack) => t.trackId === track.trackId);
  if (exists) throw new AppError("Track already in playlist", 409);

  playlist.tracks.push(track as PlaylistTrack);

  await user.save();

  return {
    ...playlist,
    id: playlist._id?.toString() || playlist.id
  };
};

const createPlaylist = async (userId: string, playlistName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new AppError("User not found", 404);

  if (!user.playlists) user.playlists = [] as Playlist[];

  const existingPlaylist = (user.playlists as Playlist[]).find((p) => p.name === playlistName);
  if (existingPlaylist) throw new AppError("Playlist already exists", 409);

  const newPlaylist = {
    name: playlistName,
    tracks: []
  };

  (user.playlists as Playlist[]).push(newPlaylist as Playlist);
  await user.save();
  const createdPlaylist = (user.playlists as any[])[(user.playlists as Playlist[]).length - 1];
  return {
    ...createdPlaylist,
    id: createdPlaylist._id?.toString() || createdPlaylist.id
  };
};

const getPlaylistSongs = async (userId: string, playlistId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId).select("playlists") as (UserWithPlaylists & Savable | null);
  if (!user) throw new AppError("User not found", 404);

  const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
  const playlist = (user.playlists as any[] | undefined)?.find((p) => 
    p._id?.toString() === playlistId || p.id === playlistId || p._id?.equals(playlistObjectId)
  );
  if (!playlist) throw new AppError("Playlist not found", 404);

  return playlist.tracks || [];
};

const removePlaylist = async (userId: string, playlistId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new AppError("User not found", 404);

  if (!user.playlists) {
    throw new AppError("User has no playlists", 404);
  }

  const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
  const initialLength = user.playlists.length;
  user.playlists = (user.playlists as any[]).filter((p: any) => 
    !(p._id?.toString() === playlistId || p.id === playlistId || p._id?.equals(playlistObjectId))
  );

  if (user.playlists.length === initialLength) {
    throw new AppError("Playlist not found", 404);
  }

  await user.save();
  
  return { message: "Playlist deleted successfully" };
};

const renamePlaylist = async (userId: string, playlistId: string, newName: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId) as (UserWithPlaylists & Savable | null);
  if (!user) throw new AppError("User not found", 404);

  if (!user.playlists) {
    throw new AppError("User has no playlists", 404);
  }

  const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
  const playlist = (user.playlists as any[]).find((p: any) => 
    p._id?.toString() === playlistId || p.id === playlistId || p._id?.equals(playlistObjectId)
  );
  if (!playlist) throw new AppError("Playlist not found", 404);

  playlist.name = newName;
  await user.save();

  return { message: "Playlist renamed successfully" };
}

export { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs, removePlaylist, renamePlaylist};
