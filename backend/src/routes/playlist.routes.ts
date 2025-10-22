import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getUserPlaylists, addTrackToPlaylist, createPlaylist, getPlaylistSongs } from "../services/playlist.service.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const playlists = await getUserPlaylists(req.user!.id);
    console.log(playlists)
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:trackId", authMiddleware, async (req, res) => {
  try {
    const trackId = req.params.trackId;
    const { playlistName, title, artist, album, image } = req.body; 
    
    console.log("Add to playlist request:", { trackId, playlistName, userId: req.user?.id, body: req.body });
    
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
  } catch (err: any) {
    console.error("Playlist route error:", err);
    return res.status(500).json({ error: err.message });
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
  } catch (err: any) {
    console.error("Create playlist error:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/allPlaylistsData", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    console.log(userId)
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
    console.log(playlistsWithTracks)
    res.status(200).json({ playlists: playlistsWithTracks });
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
