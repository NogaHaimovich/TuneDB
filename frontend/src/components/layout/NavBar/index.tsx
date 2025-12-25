import React, { useContext, useMemo } from "react";
import UserContext from "../../../Contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import { isHeroSectionVisible } from "../../../hooks/useScrollPosition";
import { useFetchAllPlaylistsDataQuery } from "../../../store";

import "./style.scss";

const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { isHeroVisible } = isHeroSectionVisible();
  const { data } = useFetchAllPlaylistsDataQuery(undefined, { skip: !user });

  const favoritesPlaylistId = useMemo(() => {
    if (!data?.playlists) return null;
    const favoritesPlaylist = data.playlists.find(p => p.name === "Favorites");
    return favoritesPlaylist?.id || null;
  }, [data]);

  const shouldShowSearchInNavbar = location.pathname !== "/" || !isHeroVisible;

  return (
    <header className="navbar__container">
      <Link  to="/" className="navbar__title">
        <span className="navbar__title--tune">Tune</span>
        <span className="navbar__title--db">DB</span>
      </Link>

      {shouldShowSearchInNavbar && (
        <div className="navbar__search">
          <SearchBar />
        </div>
      )}

      <div className="navbar__buttons">
        <Link to="/">Home</Link>
        {!user && <Link to="/signin">Signin</Link>}
        {user && (
          <>
            {favoritesPlaylistId && (
              <Link to={`/playlist/${favoritesPlaylistId}`}>Favorites</Link>
            )}
            <Link to="/playlists">My Playlists</Link>
            <Link to="/signout">Signout</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
