import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logout from "../../images/logout.svg";
import logoutblack from "../../images/logoutblack.svg";

import { NavLink, useLocation } from "react-router-dom";

function Header({ setActiveModal, onSignOut }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const onSaved = pathname.startsWith("/saved-news");

  return (
    <>
      <header
        className={`header ${onSaved ? "header__saved" : "header__home"}`} // this to change the header when on a diff route
      >
        <div className="header__left">
          <p className="header__title">NewsExplorer</p>
        </div>

        <div className="header__right">
          <div className="header__auth-buttons">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header__button-home ${
                  isActive ? "header__navlink_active" : ""
                }`
              }
              end
            >
              Home
            </NavLink>
            {currentUser ? (
              <>
                <NavLink
                  to="/saved-news"
                  className={({ isActive }) =>
                    `header__saved-articles ${
                      isActive ? "header__navlink_active" : ""
                    }`
                  }
                >
                  Saved articles
                </NavLink>
                <button className="header__button-sign-out" onClick={onSignOut}>
                  <span className="Header__user">{currentUser.username}</span>
                  <img
                    src={onSaved ? logoutblack : logout}
                    alt="logout"
                    className="logout__logo"
                  />
                </button>
              </>
            ) : (
              <button
                className="header__button-sign-in"
                onClick={() => setActiveModal("login")}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
