import axios from "axios";
import type { DeezerAlbumResponse, DeezerArtistResponse, DeezerArtistTopTracksResponse, DeezerChartTracksResponse, DeezerSearchItem, DeezerSearchResponse, DeezerTrackDetails } from "./types.js";

const DEEZER_API_BASE = "https://api.deezer.com";

const getTopRatedSongs = async (limit: number = 5): Promise<DeezerChartTracksResponse> => {
  limit = limit + 1
  try {
    const response = await axios.get<DeezerChartTracksResponse>(`${DEEZER_API_BASE}/chart/0/tracks`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated songs from Deezer API");
  }
};


const getTopRatedArtists = async (limit: number = 5): Promise<DeezerArtistResponse> => {
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/chart/0/artists`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated artists from Deezer API");
  }
};


const getNewSongs = async (limit: number = 5): Promise<DeezerChartTracksResponse> => {
  limit = limit + 1
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/editorial/0/releases`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated songs from Deezer API");
  }
};

const getSearchResults = async (query: string, page: number = 1, limit: number = 24): Promise<DeezerSearchResponse> => {
  try {
    const index = (page - 1) * limit
    const response = await axios.get(`${DEEZER_API_BASE}/search`, {
      params: { 
        q: query, 
        index,
        limit
     }, 
    });
    return response.data;
  } catch (error) {
    console.error("Deezer Search API error:", error);
    throw new Error("Failed to search data");
  }
};

const getSuggestions = async (query: string): Promise<DeezerSearchItem[]> => {
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/search`, {
      params: { q: query, limit: 7 }, 
    });
    return response.data.data; 
  } catch (error) {
    console.error("Deezer Suggestions API error:", error);
    throw new Error("Failed to fetch suggestions");
  }
};

const getRecordDetails = async (record_id: string): Promise<DeezerTrackDetails> => {
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/track/${record_id}`);
    return response.data;  
  } catch (error) {
    console.error("Deezer Records API error:", error);
    throw new Error("Failed to fetch record data from Deezer API");
  }
};

const getArtistData = async (artist_id: string): Promise<DeezerArtistResponse> =>{
  try{
    const response = await axios.get(`${DEEZER_API_BASE}/artist/${artist_id}`);
    return response.data
  } catch(error){
    console.error("Deezer Artist API error", error)
    throw new Error("Failed to fetch atrist data from Dezzer API")
  }
}

const getArtistSongs = async (artist_id: string): Promise<DeezerArtistTopTracksResponse> =>{
  try{
    const response = await axios.get(`${DEEZER_API_BASE}/artist/${artist_id}/top?limit=10`)
    return response.data
  } catch(error){
    console.error("Deezer Artist songs API error ")
    throw new Error("Failed to fetch artist songs data from Deezer api")
  }
}

const getAlbumData = async(album_id: string): Promise<DeezerAlbumResponse> => {
  try{
    const response = await axios.get(`${DEEZER_API_BASE}/album/${album_id}`)
    return response.data
  } catch(error){
    console.error("Deezer Artist songs API error ")
    throw new Error("Failed to fetch artist songs data from Deezer api")
  }
}


export default { getTopRatedSongs, getTopRatedArtists, getNewSongs, getSearchResults, getSuggestions, getRecordDetails, getArtistData, getArtistSongs, getAlbumData };
