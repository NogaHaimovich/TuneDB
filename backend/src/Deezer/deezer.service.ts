import axios from "axios";
import type { DeezerAlbumResponse, DeezerArtistResponse, DeezerArtistTopTracksResponse, DeezerChartTracksResponse, DeezerSearchItem, DeezerSearchResponse, DeezerTrackDetails } from "../types/types.js";
import { cache, Cache } from "../utils/cache.js";

const DEEZER_API_BASE = "https://api.deezer.com";

// Cache TTL constants (in milliseconds)
const CACHE_TTL = {
  CHARTS: 60 * 60 * 1000,        // 1 hour for charts (top rated songs/artists, new songs)
  SEARCH: 15 * 60 * 1000,        // 15 minutes for search results
  SUGGESTIONS: 5 * 60 * 1000,    // 5 minutes for suggestions
  DETAILS: 30 * 60 * 1000,       // 30 minutes for details (record, artist, album)
};

const getTopRatedSongs = async (limit: number = 5): Promise<DeezerChartTracksResponse> => {
  limit = limit + 1;
  const cacheKey = Cache.generateKey("getTopRatedSongs", limit);
  
  const cachedData = cache.get<DeezerChartTracksResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<DeezerChartTracksResponse>(`${DEEZER_API_BASE}/chart/0/tracks`, {
      params: { limit },
    });
    cache.set(cacheKey, response.data, CACHE_TTL.CHARTS);
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated songs from Deezer API");
  }
};


const getTopRatedArtists = async (limit: number = 5): Promise<DeezerArtistResponse> => {
  const cacheKey = Cache.generateKey("getTopRatedArtists", limit);
  
  const cachedData = cache.get<DeezerArtistResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/chart/0/artists`, {
      params: { limit },
    });
    cache.set(cacheKey, response.data, CACHE_TTL.CHARTS);
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated artists from Deezer API");
  }
};


const getNewSongs = async (limit: number = 5): Promise<DeezerChartTracksResponse> => {
  limit = limit + 1;
  const cacheKey = Cache.generateKey("getNewSongs", limit);
  
  const cachedData = cache.get<DeezerChartTracksResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/editorial/0/releases`, {
      params: { limit },
    });
    cache.set(cacheKey, response.data, CACHE_TTL.CHARTS);
    return response.data;
  } catch (error) {
    console.error("Deezer Chart API error:", error);
    throw new Error("Failed to fetch top rated songs from Deezer API");
  }
};

const getSearchResults = async (query: string, page: number = 1, limit: number = 24): Promise<DeezerSearchResponse> => {
  const cacheKey = Cache.generateKey("getSearchResults", query, page, limit);
  
  const cachedData = cache.get<DeezerSearchResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const index = (page - 1) * limit;
    const response = await axios.get(`${DEEZER_API_BASE}/search`, {
      params: { 
        q: query, 
        index,
        limit
     }, 
    });
    cache.set(cacheKey, response.data, CACHE_TTL.SEARCH);
    return response.data;
  } catch (error) {
    console.error("Deezer Search API error:", error);
    throw new Error("Failed to search data");
  }
};

const getSuggestions = async (query: string): Promise<DeezerSearchItem[]> => {
  const cacheKey = Cache.generateKey("getSuggestions", query);
  
  const cachedData = cache.get<DeezerSearchItem[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/search`, {
      params: { q: query, limit: 7 }, 
    });
    const data = response.data.data;
    cache.set(cacheKey, data, CACHE_TTL.SUGGESTIONS);
    return data; 
  } catch (error) {
    console.error("Deezer Suggestions API error:", error);
    throw new Error("Failed to fetch suggestions");
  }
};

const getRecordDetails = async (record_id: string): Promise<DeezerTrackDetails> => {
  const cacheKey = Cache.generateKey("getRecordDetails", record_id);
  
  const cachedData = cache.get<DeezerTrackDetails>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/track/${record_id}`);
    cache.set(cacheKey, response.data, CACHE_TTL.DETAILS);
    return response.data;  
  } catch (error) {
    console.error("Deezer Records API error:", error);
    throw new Error("Failed to fetch record data from Deezer API");
  }
};

const getArtistData = async (artist_id: string): Promise<DeezerArtistResponse> => {
  const cacheKey = Cache.generateKey("getArtistData", artist_id);
  
  const cachedData = cache.get<DeezerArtistResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/artist/${artist_id}`);
    cache.set(cacheKey, response.data, CACHE_TTL.DETAILS);
    return response.data;
  } catch (error) {
    console.error("Deezer Artist API error", error);
    throw new Error("Failed to fetch artist data from Deezer API");
  }
};

const getArtistSongs = async (artist_id: string): Promise<DeezerArtistTopTracksResponse> => {
  const cacheKey = Cache.generateKey("getArtistSongs", artist_id);
  
  const cachedData = cache.get<DeezerArtistTopTracksResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/artist/${artist_id}/top?limit=10`);
    cache.set(cacheKey, response.data, CACHE_TTL.DETAILS);
    return response.data;
  } catch (error) {
    console.error("Deezer Artist songs API error", error);
    throw new Error("Failed to fetch artist songs data from Deezer api");
  }
};

const getAlbumData = async (album_id: string): Promise<DeezerAlbumResponse> => {
  const cacheKey = Cache.generateKey("getAlbumData", album_id);
  
  const cachedData = cache.get<DeezerAlbumResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${DEEZER_API_BASE}/album/${album_id}`);
    cache.set(cacheKey, response.data, CACHE_TTL.DETAILS);
    return response.data;
  } catch (error) {
    console.error("Deezer Album API error", error);
    throw new Error("Failed to fetch album data from Deezer api");
  }
};


export default { getTopRatedSongs, getTopRatedArtists, getNewSongs, getSearchResults, getSuggestions, getRecordDetails, getArtistData, getArtistSongs, getAlbumData };
