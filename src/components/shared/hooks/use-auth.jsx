import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

export const useAuth = () => useContext(AuthContext);

// import { useState, useEffect, useCallback } from 'react';

// export const useAuth = () => {
//   const [token, setToken] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   const login = useCallback((token,email) => {
//     setToken(token);
//     setUserEmail(email);
//     localStorage.setItem('token', token);
//     if (email) localStorage.setItem('userEmail', email);
//   }, []);

//   const logout = useCallback(() => {
//     setToken(null);
//     setUserEmail(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//   }, [])

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedEmail = localStorage.getItem('userEmail');
//     if (storedToken) {
//       setToken(storedToken);
//       if (storedEmail) {
//         setUserEmail(storedEmail);
//       }
//     }
//   }, []);

//   return { token, userEmail, login, logout };
// }