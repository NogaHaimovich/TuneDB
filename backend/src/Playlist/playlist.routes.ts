import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllPlaylists, addTrack, createNewPlaylist, getAllPlaylistsWithTracks, deletePlaylist, updatePlaylistName} from "./playlist.controller.js";

const router = Router();

router.get("/", authMiddleware, getAllPlaylists);
router.post("/:trackId", authMiddleware, addTrack);
router.post("/create", authMiddleware, createNewPlaylist);
router.get("/allPlaylistsData", authMiddleware, getAllPlaylistsWithTracks);
router.delete("/removePlaylist", authMiddleware, deletePlaylist);
router.put("/renamePlaylist", authMiddleware, updatePlaylistName);

export default router;
