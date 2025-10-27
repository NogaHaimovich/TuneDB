import apiClient from '../utils/api-client';

export interface AddToPlaylistRequest {
  trackId: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
}

export interface PlaylistTrack {
  trackId: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
}

export interface PlaylistWithTracks {
  name: string;
  tracks: PlaylistTrack[];
}

export interface AllPlaylistsResponse {
  playlists: PlaylistWithTracks[];
}


export const addToPlaylist = async (trackId: string, trackData: Omit<AddToPlaylistRequest, 'trackId'>, playlistName: string = 'favorite') => {
  try {
    const response = await apiClient.post(`/playlist/${trackId}`, {
      playlistName,
      ...trackData
    });
    return response.data;
  } catch (error) {
    console.error('Error adding track to playlist:', error);
    throw error;
  }
};

export const getUserPlaylists = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<string[]>('/playlist');
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const createPlaylist = async (playlistName: string) => {
  try {
    const response = await apiClient.post('/playlist/create', {
      playlistName
    });
    return response.data;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

export const getAllPlaylistsData = async (): Promise<AllPlaylistsResponse> => {
  try {
    const { data } = await apiClient.get<AllPlaylistsResponse>('/playlist/allPlaylistsData');
    return data;
  } catch (error) {
    console.error('Error fetching data for playlists', error);
    throw error;
  }
};

export const removePlaylistClicked = async (playlistName: string) => {
  try {
    const response = await apiClient.delete(`/playlist/removePlaylist`, {
      params: { playlistName },
    });
    return response.data;
  } catch (error) {
    console.error(`Error removing playlist "${playlistName}":`, error);
    throw error;
  }
};

export const renamePlaylist = async(oldName: string, newName: string) =>{
  try {
    const response = await apiClient.put("/playlist/renamePlaylist", {
      oldName,
      newName
    });
    return response.data
  } catch (error){ 
    console.error(`Error renaming playlist "${oldName}":`, error);
    throw error;
  }
}