import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import logout from "../../images/logout.svg";
import logoutblack from "../../images/logoutblack.svg";



function Header({ setActiveModal, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const onSaved = pathname.startsWith("/saved-news");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`header ${onSaved ? "header__saved" : "header__home"} ${isMenuOpen ? "header_menu-open" : ""}`} 
      >
        <div className="container"> 
        <div className="header__left">
          <p className="header__title">NewsExplorer</p>
        </div>

        <button 
         className={`header__menu-button 
           ${isMenuOpen ? "header__menu-button_close" : ""} 
           ${onSaved && !isMenuOpen ? "header__menu-button_black" : ""}`} 
           onClick={toggleMenu}
           aria-label="toggle menu"
/>

    

          <div className={`header__right ${isMenuOpen ? "header__right_mobile-visible" : ""}`}>
          <nav className="header__auth-buttons">
            <NavLink to="/" end className={({ isActive }) => `header__button-home ${isActive ? "header__navlink_active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            
            {currentUser ? (
              <>
                <NavLink to="/saved-news" className={({ isActive }) => `header__saved-articles ${isActive ? "header__navlink_active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                  Saved articles
                </NavLink>
                <button className="header__button-sign-out" onClick={() => { onSignOut(); setIsMenuOpen(false); }}>
                  <span className="Header__user">{currentUser.username}</span>
                  <img src={onSaved && !isMenuOpen ? logoutblack : logout} alt="logout" className="logout__logo" />
                </button>
              </>
            ) : (
              <button className="header__button-sign-in" onClick={() => { setActiveModal("login"); setIsMenuOpen(false); }}>
                Sign in
              </button>
            )}
          </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
