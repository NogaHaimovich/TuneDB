import { Router } from "express";
import { getTopRatedSongs, getTopRatedArtists, getNewSongs, getAlbumDetails, getArtistDetails, getRecordDetails, getSearchResults, getSuggestions } from "./deezer.controller.js";

const router = Router();


router.get("/topRatedSongs", getTopRatedSongs);
router.get("/topRatedArtists", getTopRatedArtists);
router.get("/newSongs", getNewSongs);

router.get("/search", getSearchResults);
router.get("/suggest", getSuggestions);

router.get("/record", getRecordDetails);
router.get("/artist", getArtistDetails);
router.get("/album", getAlbumDetails);

export default router;