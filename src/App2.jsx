import Header from './components/UI/Navigation/Header.jsx';
import Sidebar from './components/UI/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './components/shared/context/auth-context.jsx';
//import { useState, useEffect } from "react";

const App2 = () => {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // },[]);

  return (
    <AuthProvider>
        <div className="flex flex-col h-screen bg-weather-teal">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar token={token} className="w-64 bg-gray-800 text-stone-200 min-h-screen" />
            <div className="flex-1 px-3 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
    </AuthProvider>
  );
};

export default App2;