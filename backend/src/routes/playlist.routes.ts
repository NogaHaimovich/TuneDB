import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs, removePlaylist, renamePlaylist} from "../services/playlist.service.js";
import { getErrorMessage } from "../utils.js";

const router = Router();


router.get("/", authMiddleware, async (req, res) => {
  try {
    const playlists = await getUserPlaylists(req.user!.id);
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:trackId", authMiddleware, async (req, res) => {
  try {
    const trackId = req.params.trackId;
    const { playlistName, title, artist, album, image } = req.body; 
    
    
    if (!trackId) {
      return res.status(400).json({ error: "trackId parameter is required" });
    }

    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "User ID not found in token" });
    }

    const userId = req.user.id; 

    const updatedPlaylist = await addTrackToPlaylist(userId, playlistName, {
      trackId,
      title,
      artist,
      album,
      image,
    });

    return res.status(200).json(updatedPlaylist);
  } catch (err: unknown) {
    console.error("Playlist route error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
});

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { playlistName } = req.body;
    
    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "User ID not found in token" });
    }

    const userId = req.user.id;
    const newPlaylist = await createPlaylist(userId, playlistName);

    return res.status(201).json(newPlaylist);
  } catch (err: unknown) {
    console.error("Create playlist error:", err);
    return res.status(500).json({error: getErrorMessage(err) });
  }
});

router.get("/allPlaylistsData", authMiddleware, async (req, res) => {
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
    console.error("Error fetching playlists:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/removePlaylist", authMiddleware, async (req, res) => {
  try {
    const { playlistName } = req.body;
    
    if (!playlistName) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "User ID not found in token" });
    }

    const userId = req.user.id;
    const result = await removePlaylist(userId, playlistName);

    return res.status(200).json(result);
  } catch (err: unknown) {
    console.error("Delete playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
});

router.put("/renamePlaylist", authMiddleware, async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res.status(400).json({ error: "Old and new names are required" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "User ID not found in token" });
    }

    const userId = req.user.id;
    const result = await renamePlaylist(userId, oldName, newName)
    return res.status(200).json(result)
   
  } catch (err: unknown) {
    console.error("Rename playlist error:", err);
    return res.status(500).json({ error: getErrorMessage(err) });
  }
});

export default router;
