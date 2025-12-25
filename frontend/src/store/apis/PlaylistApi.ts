import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { AddToPlaylistRequest, AllPlaylistsResponse } from '../../types';
import { getToken, signOut } from '../../utils/auth';

interface AddToPlaylistResponse {
  success: boolean;
  message?: string;
}

interface CreatePlaylistResponse {
  success: boolean;
  message?: string;
  playlistName?: string;
}

interface RemovePlaylistResponse {
  success: boolean;
  message?: string;
}

interface RenamePlaylistResponse {
  success: boolean;
  message?: string;
}

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  
  if (result.error && 'status' in result.error) {
    const status = (result.error as FetchBaseQueryError).status;
    if (status === 401 || status === 403) {
      signOut();
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
  }
  
  return result;
};

const playlistApi = createApi({
  reducerPath: 'playlist',
  baseQuery: baseQueryWithReauth,

  tagTypes: ["Playlists"],

  endpoints: (builder) => ({
    fetchAllPlaylistsData: builder.query<AllPlaylistsResponse, void>({
      query: () => '/playlist/allPlaylistsData',
      providesTags: ["Playlists"],
    }),

    addToPlaylist: builder.mutation<
      AddToPlaylistResponse,
      { trackId: string; trackData: Omit<AddToPlaylistRequest, 'trackId'>; playlistId: string }
    >({
      query: ({ trackId, trackData, playlistId }) => ({
        url: `/playlist/${trackId}`,
        method: "POST",
        body: {
          playlistId,
          ...trackData,
        },
      }),
      invalidatesTags: ["Playlists"],
    }),

    removePlaylist: builder.mutation<RemovePlaylistResponse, string>({
      query: (playlistId) => ({
        url: '/playlist/removePlaylist',
        method: 'DELETE',
        body: { playlistId },
      }),
      invalidatesTags: ["Playlists"]
    }),

    createPlaylist: builder.mutation<CreatePlaylistResponse, string>({
      query: (playlistName) => ({
        url: '/playlist/create',
        method: 'POST',
        body: { playlistName }
      }),
      invalidatesTags: ["Playlists"]
    }),

    renamePlaylist: builder.mutation<RenamePlaylistResponse, { playlistId: string; newName: string }>({
      query: ({ playlistId, newName }) => ({
        url: '/playlist/renamePlaylist',
        method: 'PUT',
        body: {
          playlistId,
          newName
        }
      }),
      invalidatesTags: ["Playlists"]
    })

  })
});

export const { useFetchAllPlaylistsDataQuery, useAddToPlaylistMutation, useCreatePlaylistMutation, useRenamePlaylistMutation, useRemovePlaylistMutation } = playlistApi;
export { playlistApi };
