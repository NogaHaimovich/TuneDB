import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import PlaylistPage from "../../pages/PlaylistPage";
import MyPlaylistsPage from "../../pages/MyPlayListsPage";
import LogOut from "../../pages/LogOutPage";

const ProtectedRoutes = () => {
  return [
      <Route 
        key="playlist"
        path="/playlist/:name" 
        element={
          <ProtectedRoute>
            <PlaylistPage />
          </ProtectedRoute>
        } 
      />,
      <Route 
        key="playlists"
        path="/playlists" 
        element={
          <ProtectedRoute>
            <MyPlaylistsPage />
          </ProtectedRoute>
        } 
      />,
      <Route 
        key="signout"
        path="/signout" 
        element={
          <ProtectedRoute>
            <LogOut />
          </ProtectedRoute>
        } 
      />
  ];
};

export default ProtectedRoutes;
