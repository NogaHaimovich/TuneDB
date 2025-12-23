import { Route } from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import SignIn from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignupPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import AlbumPage from "../../pages/AlbumPage";
import ArtistPage from "../../pages/ArtistPage";
import RecordPage from '../../pages/RecordPage';

const PublicRoutes = () => {
  return [
        <Route key="home" path="/" element={<HomePage />} />,
        <Route key="signin" path="/signin" element={<SignIn />} />,
        <Route key="signup" path="/signup" element={<SignUpPage />} />,
        <Route key="search" path="/search/:query" element={<SearchResultsPage/>}/>,
        <Route key="artist" path="/artist/:id" element={<ArtistPage/>}/>,
        <Route key="album" path="/album/:id" element={<AlbumPage/>}/>,
        <Route key="record" path="/record/:id" element={<RecordPage />} />
  ]
}
export default PublicRoutes 