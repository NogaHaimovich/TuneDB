import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllPlaylists, addTrack, createNewPlaylist, getAllPlaylistsWithTracks, deletePlaylist, updatePlaylistName} from "./playlist.controller.js";

const router = Router();


router.get("/", authMiddleware, getAllPlaylists);
router.get("/allPlaylistsData", authMiddleware, getAllPlaylistsWithTracks);

router.post("/create", authMiddleware, createNewPlaylist);
router.post("/:trackId", authMiddleware, addTrack);

router.put("/renamePlaylist", authMiddleware, updatePlaylistName);

router.delete("/removePlaylist", authMiddleware, deletePlaylist);

export default router;
