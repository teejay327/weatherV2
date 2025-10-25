import { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  isLoading: false
});

export const AuthProvider = ({ children }) => {
  const [token,setToken] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);

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
        console.error("[AuthProvider] Failed to read token, clearing it now!");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // on login save token to state & localStorage
  const login =  useCallback((newToken) => {
    if (newToken && newToken.split(".").length === 3) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      // token debug
    console.log("[AuthProvider] login successful, token stored");
    } else {
      console.warn("[AuthProvider] tried to login with malformed token");
    }
  }, []);

  // on logout clear token from state & localStorage
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    console.log("[AuthProvider] logged out, token cleared!");
  }, []);

  // validate token on startup
  useEffect(() => {
    setIsLoading(true);
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setIsLoading(false);
      console.log('[AuthProvider] no token found on startup - skipping validation');
      return;
    };

    const validateToken = async() => {
      try {
        const res = await fetch('http://localhost:5000/api/users/validate', {
          headers: {Authorization: `Bearer ${storedToken}`}
        });
        const data = await res.json();

        if (res.ok && data?.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          console.log('[AuthProvider] token validated & refreshed');
        } else {
          console.warn('[AuthProvider] token invlaid - logging out');
          logout()
          toast.error('session expired - please log in again');
        }
      } catch(err) {
        console.error('[AuthProvider] token validation error:', err);
        logout();
        toast.error('session validaion failed - please log in again');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [logout]);

  // silent refresh every 60 mins
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async() => {
      try {
        const res = await fetch('http://localhost:5000/api/users/validate', {
          headers: { Authorization: `Bearer ${token}`}
        })
        const data = await res.json();

        if (res.ok && data?.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          console.log('[AuthProvider] token auto-refreshed silently');
        } else {
          console.warn('[AuthProvider] auto-refresh failed - logging out');
          logout();
          toast.error('session expired - please log in again');
        }
      } catch(err) {
        console.error('[AuthProvider] silent refresh error:', err);
      }
    }, 1000 * 60 * 60) // every 60 minutes

    return() => clearInterval(interval);
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};