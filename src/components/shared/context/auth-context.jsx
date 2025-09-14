import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext({
  // isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token,setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage .getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // on login save token to state & localStorage
  const login =  useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, []);

  // on logout clear token from state & localStorage
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};