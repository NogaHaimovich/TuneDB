import { Route, Routes } from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import SignIn from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignupPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import AlbumPage from "../../pages/AlbumPage";
import ArtistPage from "../../pages/ArtistPage";
import RecordPage from '../../pages/RecordPage';
import ProtectedRoute from "../protected/ProtectedRoute";
import PlaylistPage from "../../pages/PlaylistPage";
import MyPlaylistsPage from "../../pages/MyPlayListsPage";
import LogOut from "../../pages/LogOutPage";

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search/:query" element={<SearchResultsPage/>}/>
        <Route path="/artist/:id" element={<ArtistPage/>}/>
        <Route path="/album/:id" element={<AlbumPage/>}/>
        <Route path="/record/:id" element={<RecordPage />} />
        
        {/* Protected Routes */}
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
    </Routes>
  )
}
export default PublicRoutes 