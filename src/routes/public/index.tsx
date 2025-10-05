import { Route, Routes } from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import SignIn from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignupPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import AlbumPage from "../../pages/AlbumPage";
import ArtistPage from "../../pages/ArtistPage";


const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search/:query" element={<SearchResultsPage/>}/>
        <Route path="/artist/:id" element={<ArtistPage/>}/>
        <Route path="/album/:id" element={<AlbumPage/>}/>
    </Routes>
  )
}
export default PublicRoutes 