import React from "react";
import { removeToken } from "../utils/auth";
import { useState, useMemo, useEffect } from "react";

const CurrentUserContext = React.createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleLogin(userData) {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  function handleUpdate(updatedUserData) {
    setCurrentUser(updatedUserData);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isLoading,
        setIsLoading,
        setCurrentUser,
        handleLogin,
        handleLogout,
        handleUpdate,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
