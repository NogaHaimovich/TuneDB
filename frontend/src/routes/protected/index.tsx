import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import PlaylistDetailPage from "../../pages/PlaylistDetailPage/PlaylistDetailPage";
import PlaylistsListPage from "../../pages/PlaylistsListPage/PlaylistsListPage";
import LogOut from "../../pages/LogOutPage/LogOutPage";

const ProtectedRoutes = () => {
  return [
      <Route 
        key="playlist"
        path="/playlist/:id" 
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
