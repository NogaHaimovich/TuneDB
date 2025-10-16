import { Route } from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import SignIn from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignupPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import AlbumPage from "../../pages/AlbumPage";
import ArtistPage from "../../pages/ArtistPage";
import RecordPage from '../../pages/RecordPage';

const PublicRoutes = () => {
  return (
    <>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search/:query" element={<SearchResultsPage/>}/>
        <Route path="/artist/:id" element={<ArtistPage/>}/>
        <Route path="/album/:id" element={<AlbumPage/>}/>
        <Route path="/record/:id" element={<RecordPage />} />
    </>
  )
}
export default PublicRoutes 