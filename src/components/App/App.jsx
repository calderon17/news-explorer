import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchNews } from "../../utils/newsApi.js";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";

import { registerUser, authenticateUser } from "../../data/users";

function App() {
  // UI state
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  // Search state
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  // console.log("activeModal:", activeModal);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ne_current_user");
      if (raw) {
        const user = JSON.parse(raw);
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
    } catch { localStorage.removeItem("ne_current_user"); }
  }, []);

  useEffect(() => {
    getSavedArticles()
      .then(setSavedArticles)
      .catch(() => setSavedArticles([]));
  }, []);

  // Modal Controls
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSwitchModal = () => {
    setActiveModal(activeModal === "register" ? "login" : "register");
  };

  // Auth
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setLoginError("");

    return new Promise((resolve, reject) => {
      const result = authenticateUser(email, password);
      if (!result.ok) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setLoginError(result.error || "Incorrect email or password");
        setIsLoading(false);
        reject(new Error(result.error || "Login failed"));
        return;
      }

      setIsLoggedIn(true);
      setCurrentUser(result.user); // result.user has no password
      localStorage.setItem("ne_current_user", JSON.stringify(result.user));
      closeActiveModal();
      setIsLoading(false);
      resolve(result.user);
    });
  };

  const handleRegister = ({ email, password, username }) => {
    setIsLoading(true);
    setLoginError("");

    return new Promise((resolve, reject) => {
      const result = registerUser({ email, password, username });
      if (!result.ok) {
        setIsLoading(false);
        reject(new Error(result.error || "Registration failed"));
        return;
      }

      setIsLoggedIn(true);
      setCurrentUser(result.user);
      localStorage.setItem("ne_current_user", JSON.stringify(result.user));
      closeActiveModal();
      setIsLoading(false);
      resolve(result.user);
    });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("ne_current_user");
  };

  async function handleSearch(query) {
    try {
      setCurrentSearchTerm(query);
      setIsSearching(true);
      setSearchError("");
      setHasSearched(true);
      setVisibleCount(3);
      const items = await fetchNews(query);
      setArticles(items);
    } catch (e) {
      setArticles([]);
      setSearchError(
        "Sorry, something went wrong during the request. Please try again later. "
      );
    } finally {
      setIsSearching(false);
    }
  }

  function handleShowMore() {
    setVisibleCount((v) => v + 3);
  }

  async function handleToggleSave(article) {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    const existing = savedArticles.find((a) => a.url === article.url);
    if (existing) {
      await deleteArticle(existing._id || existing.url);
      setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
    } else {
      const saved = await saveArticle(article, currentSearchTerm); // ← add second arg
      setSavedArticles((prev) => [saved, ...prev]);
    }
  }

  // function handleSaveArticle(article) {
  //   const alreadySaved = savedArticles.some((a) => a.title === article.title);

  //   if (alreadySaved) {
  //     setSavedArticles((prev) => prev.filter((a) => a.title !== article.title));
  //   } else {
  //     setSavedArticles((prev) => [...prev, article]);
  //   }
  // }

  // const handleLogin = ({ email, password }) => {
  //   return login({ email, password })
  //     .then((data) => {
  //       if (data.token) {
  //         setIsLoggedIn(true);
  //         return checkToken(data.token);
  //       }
  //     })
  //     .then((userData) => {
  //       setCurrentUser(userData);
  //       closeActiveModal();
  //     })
  //     .catch((err) => {
  //       setLoginError("Incorrect email or password");
  //       throw new Error("Incorrect email or password");
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  // const handleRegister = ({ email, password, name }) => {
  //   return register({ email, password, name })
  //     .then((res) => {
  //       // After successful registration, log the user in
  //       return login({ email, password });
  //     })
  //     .then((data) => {
  //       if (data.token) {
  //         setIsLoggedIn(true);
  //         return checkToken(data.token);
  //       }
  //     })
  //     .then((userData) => {
  //       setCurrentUser(userData);
  //       closeActiveModal();
  //     })
  //     .catch(console.error)
  //     .finally(() => setIsLoading(false));
  // };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isLoading,
        setIsLoading,
        setCurrentUser,
        handleLogin,
      }}
    >
      <div className="page">
        <div className="page_content">
          <div className="hero">
            <Header
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              setActiveModal={setActiveModal}
              onSignOut={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Main
                      section="search"
                      onSearch={handleSearch}
                      isSearching={isSearching}
                      searchError={searchError}
                      hasSearched={hasSearched}
                      articles={articles}
                      visibleCount={visibleCount}
                      onShowMore={handleShowMore}
                      isLoggedIn={isLoggedIn}
                      savedArticles={savedArticles}
                      onToggleSave={handleToggleSave}
                    />
                    <Main section="author" />
                  </>
                }
              />

              <Route
                path="/saved-news"
                element={
                  <SavedNews
                    savedArticles={savedArticles}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                    onToggleSave={handleToggleSave}
                  />
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
          onSwitchModal={handleSwitchModal}
          isLoading={isLoading}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
          onSwitchModal={handleSwitchModal}
          errorMessage={loginError}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
