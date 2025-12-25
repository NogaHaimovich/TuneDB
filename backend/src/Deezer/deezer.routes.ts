import { Router } from "express";
import { getTopRatedSongs, getTopRatedArtists, getNewSongs, getAlbumDetails, getArtistDetails, getRecordDetails, getSearchResults, getSuggestions } from "./deezer.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { searchSchema, suggestionsSchema, recordDetailsSchema, artistDetailsSchema, albumDetailsSchema, limitSchema } from "../middleware/validators/deezer.validators.js";

const router = Router();


router.get("/topRatedSongs", validateRequest(limitSchema), getTopRatedSongs);
router.get("/topRatedArtists", validateRequest(limitSchema), getTopRatedArtists);
router.get("/newSongs", validateRequest(limitSchema), getNewSongs);

router.get("/search", validateRequest(searchSchema), getSearchResults);
router.get("/suggest", validateRequest(suggestionsSchema), getSuggestions);

router.get("/record", validateRequest(recordDetailsSchema), getRecordDetails);
router.get("/artist", validateRequest(artistDetailsSchema), getArtistDetails);
router.get("/album", validateRequest(albumDetailsSchema), getAlbumDetails);

export default router;