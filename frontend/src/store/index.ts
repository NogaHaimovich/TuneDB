import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/UserApi';
import { playlistApi } from './apis/PlaylistApi';

export const store = configureStore({
  reducer: {
    [playlistApi.reducerPath]: playlistApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(playlistApi.middleware).concat(usersApi.middleware);
  }
});

setupListeners(store.dispatch);

export {useFetchAllPlaylistsDataQuery, useAddToPlaylistMutation, useCreatePlaylistMutation, useRenamePlaylistMutation, useRemovePlaylistMutation} from './apis/PlaylistApi'
export {useSignUpUserMutation, useSignInUserMutation} from "./apis/UserApi"