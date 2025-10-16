import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import PlaylistPage from "../../pages/PlaylistPage";
import MyPlaylistsPage from "../../pages/MyPlayListsPage";
import LogOut from "../../pages/LogOutPage";

const ProtectedRoutes = () => {
  return (
    <>
      <Route 
        path="/playlist/:name" 
        element={
          <ProtectedRoute>
            <PlaylistPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/playlists" 
        element={
          <ProtectedRoute>
            <MyPlaylistsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/signout" 
        element={
          <ProtectedRoute>
            <LogOut />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default ProtectedRoutes;
