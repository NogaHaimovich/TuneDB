import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AddToPlaylistRequest, AllPlaylistsResponse } from '../../types';

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

const playlistApi = createApi({
  reducerPath: 'playlist',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  tagTypes: ["Playlists"],

  endpoints: (builder) => ({
    fetchAllPlaylistsData: builder.query<AllPlaylistsResponse, void>({
      query: () => '/playlist/allPlaylistsData',
      providesTags: ["Playlists"],
    }),

    addToPlaylist: builder.mutation<
      AddToPlaylistResponse,
      { trackId: string; trackData: Omit<AddToPlaylistRequest, 'trackId'>; playlistName?: string }
    >({
      query: ({ trackId, trackData, playlistName = 'favorite' }) => ({
        url: `/playlist/${trackId}`,
        method: "POST",
        body: {
          playlistName,
          ...trackData,
        },
      }),
      invalidatesTags: ["Playlists"],
    }),

    removePlaylist: builder.mutation<RemovePlaylistResponse, string>({
      query: (playlistName) => ({
        url: '/playlist/removePlaylist',
        method: 'DELETE',
        body: { playlistName },
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

    renamePlaylist: builder.mutation<RenamePlaylistResponse, { oldName: string; newName: string }>({
      query: ({ oldName, newName }) => ({
        url: '/playlist/renamePlaylist',
        method: 'PUT',
        body: {
          oldName,
          newName
        }
      }),
      invalidatesTags: ["Playlists"]
    })

  })
});

export const { useFetchAllPlaylistsDataQuery, useAddToPlaylistMutation, useCreatePlaylistMutation, useRenamePlaylistMutation, useRemovePlaylistMutation } = playlistApi;
export { playlistApi };
