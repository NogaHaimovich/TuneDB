import deezerService from "./deezer.service.js";
import type { Request, Response } from "express";



export const getTopRatedSongs = async (req: Request, res: Response) => {
  try {
        const limit = parseInt(req.query.limit as string) || 5;
        const data = await deezerService.getTopRatedSongs(limit);
        const simplifiedData = data.data.map((track: { id: number; title: string; artist?: { picture_big?: string } }) => ({
            songName: track.title,
            image: track.artist?.picture_big,
            track_id: track.id
    }));
    
    res.json({
      total: data.total,
      tracks: simplifiedData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart tracks from Deezer" });
  }
};


export const getTopRatedArtists = async (req: Request, res: Response) => {
  try {
        const limit = parseInt(req.query.limit as string) || 5;

        const data = await deezerService.getTopRatedArtists(limit);    
        const artists = data.data ?? [];
        const simplifiedData = artists.map((artist: { id: number; name: string; picture_big?: string }) => ({
            artistName: artist.name,
            image: artist.picture_big,
            artist_id: artist.id
        }));
    
        res.json({
        total: data.total,
        tracks: simplifiedData
        });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart artists from Deezer" });
  }
};

export const getNewSongs = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await deezerService.getNewSongs(limit);
    
    const simplifiedData = data.data.map((track: { id: number; title: string; cover_big?: string }) => ({
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
};


export const getSearchResults = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25; 

    const data = await deezerService.getSearchResults(query, page, limit);

    const total = data.total || 0;
    const hasMore = Boolean(data.next);
    const nextPage = hasMore ? page + 1 : null;

    res.json({
      data: data.data, 
      meta: {
        total,
        page,
        limit,
        hasMore,
        nextPage,
      },
    });
  } catch (error) {
    console.error("Search route error:", error);
    res.status(500).json({ error: "Failed to search" });
  }
};

export const getSuggestions = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    const data = await deezerService.getSuggestions(query);
    res.json(data); 
  } catch (error) {
    console.error("Search route error:", error);
    res.status(500).json({ error: "Failed to search" });
  }
};

export const getRecordDetails = async (req: Request, res: Response) => {
  try {
    const record_id = req.query.id as string;

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
};

export const getArtistDetails = async (req: Request, res: Response) => {
  try {
    const artist_id = req.query.id as string;

    const artist_data = await deezerService.getArtistData(artist_id);
    const artist_songs = await deezerService.getArtistSongs(artist_id);

    const simplifiedSongs = artist_songs.data.map((track: { id: number; title: string; album?: { cover_medium?: string } }) => ({
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
};

export const getAlbumDetails = async (req: Request, res: Response) => {
  try{
    const album_id = req.query.id as string;

    const album_data = await deezerService.getAlbumData(album_id);
    const simplifiedTracks = album_data.tracks?.data.map((track: { id: number; title: string; duration?: number; preview?: string; explicit_lyrics?: boolean }) => ({
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
  } catch (error) {
    console.error("Album route error: ", error);
    res.status(500).json({ error: "Failed to fetch album data" });
  }
};


