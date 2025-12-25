import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllPlaylists, addTrack, createNewPlaylist, getAllPlaylistsWithTracks, deletePlaylist, updatePlaylistName} from "./playlist.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { createPlaylistSchema, addTrackSchema, deletePlaylistSchema, renamePlaylistSchema } from "../middleware/validators/playlist.validators.js";

const router = Router();


router.get("/", authMiddleware, getAllPlaylists);
router.get("/allPlaylistsData", authMiddleware, getAllPlaylistsWithTracks);

router.post("/create", authMiddleware, validateRequest(createPlaylistSchema), createNewPlaylist);
router.post("/:trackId", authMiddleware, validateRequest(addTrackSchema), addTrack);

router.put("/renamePlaylist", authMiddleware, validateRequest(renamePlaylistSchema), updatePlaylistName);

router.delete("/removePlaylist", authMiddleware, validateRequest(deletePlaylistSchema), deletePlaylist);

export default router;
