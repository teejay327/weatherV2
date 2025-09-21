import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext({
  // isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false
});

export const AuthProvider = ({ children }) => {
  const [token,setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage .getItem("token");
    if (storedToken) {
      try {
        if (storedToken.split(".").length === 3) {
        setToken(storedToken);
        console.log("[AuthProvider] loaded valid token from localStorage:", storedToken);
      } else {
        console.warn("[AuthProvider] Invalid token format, clearing it now!");
        localStorage.removeItem("token");
      } 
      } catch (err) {;
        console.error("AuthProvider] Failed to read token, clearing it now!");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // on login save token to state & localStorage
  const login =  useCallback((newToken) => {
    if (newToken && storedToken.split(".").length === 3) {
      setToken(newToken);
      localStorage.setItem("token", newToken);
      // token debug
    console.log("[AuthProvider] login successful, token stored:");
    } else {
      console.warn("[AuthProvider] Tried to login with malformed token");
    }
  }, []);

  // on logout clear token from state & localStorage
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    console.log("[AuthProvider] Logges out, token cleared!");
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};