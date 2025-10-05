import { Router } from "express";
import deezerService from "../services/dezzer.service.js";

export const router = Router();

router.get("/topRatedSongs", async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const data = await deezerService.getTopRatedSongs(limit);


    const simplifiedData = data.data.map((track: any) => ({
      songName: track.title,
      image: track.artist["picture_big"],
      track_id: track.id
    }));
    
    res.json({
      total: data.total,
      tracks: simplifiedData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart tracks from Deezer" });
  }
});


router.get("/topRatedArtists", async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const data = await deezerService.getTopRatedArtists(limit);    
    const simplifiedData = data.data.map((artist: any) => ({
      artistName: artist.name,
      image: artist.picture_big,
      artist_id: artist.id
    }));
    
    res.json({
      total: data.total,
      tracks: simplifiedData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart tracks from Deezer" });
  }
});

router.get("/newSongs", async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const data = await deezerService.getNewSongs(limit);
    
    const simplifiedData = data.data.map((track: any) => ({
      songName: track.title,
      image: track.cover_big,
      track_id: track.id
    }));
    
    res.json({
      total: data.total,
      tracks: simplifiedData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart tracks from Deezer" });
  }
});


router.get("/search", async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const data = await deezerService.getSearchResults(query);
    res.json(data); 
  } catch (error) {
    console.error("Search route error:", error);
    res.status(500).json({ error: "Failed to search" });
  }
});


router.get("/suggest", async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const data = await deezerService.getSuggestions(query);
    res.json(data); 
  } catch (error) {
    console.error("Search route error:", error);
    res.status(500).json({ error: "Failed to search" });
  }
});

router.get("/record", async (req, res) => {
  try {
    const record_id = req.query.id as string;
    if (!record_id) {
      return res.status(400).json({ error: "Missing record id" });
    }

    const track = await deezerService.getRecordDetails(record_id);

    if (req.query.full === "true") {
      return res.json(track);
    }

    const simplifiedTrack = {
      id: track.id,
      title: track.title_short,
      preview: track.preview,
      duration: track.duration,
      releaseDate: track.release_date,
      rank: track.rank,
      explicit: track.explicit_lyrics,
      artist: track.artist ? {
        name: track.artist.name,
        link: track.artist.link,
        picture: track.artist.picture_medium,
        id: track.artist.id
      } : null,
      album: track.album ? {
        title: track.album.title,
        link: track.album.link,
        cover: track.album.cover_medium,
      } : null,
    };

    res.json(simplifiedTrack);
  } catch (error) {
    console.error("Record route error:", error);
    res.status(500).json({ error: "Failed to fetch record data" });
  }
});

router.get("/artist", async (req, res) => {
  try {
    const artist_id = req.query.id as string;
    if (!artist_id) {
      return res.status(400).json({ error: "Missing artist id" });
    }

    const artist_data = await deezerService.getArtistData(artist_id);
    const artist_songs = await deezerService.getArtistSongs(artist_id);

    const simplifiedSongs = artist_songs.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      image: track.album?.cover_medium,
    }));

    const simplifiedData = {
      id: artist_data.id,
      name: artist_data.name,
      image: artist_data.picture_medium,
      albums: artist_data.nb_album,
      songs: simplifiedSongs, 
    };

    res.json(simplifiedData);
  } catch (error) {
    console.error("Artist route error: ", error);
    res.status(500).json({ error: "Failed to fetch artist data" });
  }
});

router.get("/album", async (req, res) => {
  try{
    const album_id = req.query.id as string;
    if(!album_id){
      return res.status(400).json({error: "Missing album id"})
    }

    const album_data = await deezerService.getAlbumData(album_id);
    const simplifiedTracks = album_data.tracks?.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      duration: track.duration,
      preview: track.preview,
      explicit: track.explicit_lyrics,
    }));

    const simplifiedAlbum = {
      id: album_data.id,
      title: album_data.title,
      cover: album_data.cover_big,
      releaseDate: album_data.release_date,
      artist: {
        id: album_data.artist.id,
        name: album_data.artist.name,
        picture: album_data.artist.picture_medium,
      },
      tracks: simplifiedTracks,
    };


    res.json(simplifiedAlbum);
  }catch(error){
    console.error("Album route error: ", error);
    res.status(500).json({ error: "Failed to fetch album data" });
  }
})


export default router;
