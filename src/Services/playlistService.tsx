import apiClient from '../utils/api-client';

export interface AddToPlaylistRequest {
  trackId: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
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
