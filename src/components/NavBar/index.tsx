import React, { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import { isHeroSectionVisible } from "../../hooks/useScrollPosition";

import "./style.scss";

const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { isHeroVisible } = isHeroSectionVisible();


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
            <Link to="/playlist/Favorites">Favorites</Link>
            <Link to="/playlists">My Playlists</Link>
            <Link to="/signout">Signout</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
