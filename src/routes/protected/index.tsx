import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import PlaylistDetailPage from "../../pages/PlaylistDetailPage";
import PlaylistsListPage from "../../pages/PlaylistsListPage";
import LogOut from "../../pages/LogOutPage";

const ProtectedRoutes = () => {
  return [
      <Route 
        key="playlist"
        path="/playlist/:name" 
        element={
          <ProtectedRoute>
            <PlaylistDetailPage />
          </ProtectedRoute>
        } 
      />,
      <Route 
        key="playlists"
        path="/playlists" 
        element={
          <ProtectedRoute>
            <PlaylistsListPage />
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
