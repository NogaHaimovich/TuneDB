import type { Request, Response } from "express";
import { getErrorMessage } from "../utils.js";
import { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs, removePlaylist, renamePlaylist } from "./playlist.service.js";

export const getAllPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const playlists = await getUserPlaylists(userId);
    res.json(playlists);
  } catch (err) {
    console.error("Get playlists error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addTrack = async (req: Request, res: Response) => {
  try {
    const trackId = req.params.trackId;
    const { playlistName, title, artist, album, image } = req.body;
    const userId = req.user!.id;

    if (!trackId) {
      return res.status(400).json({ error: "trackId parameter is required" });
    }

    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const updatedPlaylist = await addTrackToPlaylist(userId, playlistName, {
      trackId,
      title,
      artist,
      album,
      image,
    });

    return res.status(200).json(updatedPlaylist);
  } catch (err: unknown) {
    console.error("Add track to playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const createNewPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistName } = req.body;
    const userId = req.user!.id;

    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const newPlaylist = await createPlaylist(userId, playlistName);
    return res.status(201).json(newPlaylist);
  } catch (err: unknown) {
    console.error("Create playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const getAllPlaylistsWithTracks = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const playlistNames = await getUserPlaylists(userId);
    
    const playlistsWithTracks = await Promise.all(
      playlistNames.map(async (name) => {
        const playlist = await getPlaylistSongs(userId, name);
        return {
          name,
          tracks: playlist || []
        };
      })
    );
    
    res.status(200).json({ playlists: playlistsWithTracks });
  } catch (err) {
    console.error("Error fetching playlists with tracks:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistName } = req.body;
    const userId = req.user!.id;

    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const result = await removePlaylist(userId, playlistName);
    return res.status(200).json(result);
  } catch (err: unknown) {
    console.error("Delete playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const updatePlaylistName = async (req: Request, res: Response) => {
  try {
    const { oldName, newName } = req.body;
    const userId = req.user!.id;

    if (!oldName || !newName) {
      return res.status(400).json({ error: "Old and new names are required" });
    }

    const result = await renamePlaylist(userId, oldName, newName);
    return res.status(200).json(result);
  } catch (err: unknown) {
    console.error("Rename playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

