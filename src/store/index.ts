import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { playlistApi } from './apis/playlistApi';

export const store = configureStore({
  reducer: {
    [playlistApi.reducerPath]: playlistApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(playlistApi.middleware);
  }
});

setupListeners(store.dispatch);

export {useFetchAllPlaylistsDataQuery, useAddToPlaylistMutation, useCreatePlaylistMutation, useRenamePlaylistMutation, useRemovePlaylistMutation} from './apis/playlistApi'
