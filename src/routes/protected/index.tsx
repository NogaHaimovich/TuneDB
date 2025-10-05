import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import FavoritesPage from "../../pages/FavoritesPage";
import MyPlaylistsPage from "../../pages/MyPlayListsPage";
import RecordPage from "../../pages/RecordPage";
import LogOut from "../../pages/LogOutPage";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <FavoritesPage />
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
        path="/record/:id" 
        element={
          <ProtectedRoute>
            <RecordPage />
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
    </Routes>
  );
};

export default ProtectedRoutes;
