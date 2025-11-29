import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './components/shared/context/AuthProvider.jsx';
import { Toaster } from  'react-hot-toast';
import RootLayout from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Search from './pages/Search.jsx';
import Charts from './pages/Charts.jsx';
import CurrentLocation from './pages/CurrentLocation.jsx';
import FiveDays from './pages/FiveDays.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Tomorrow from './pages/Tomorrow.jsx';
import RequireAuth from './components/shared/guard/RequireAuth.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup />},
      { element: <RequireAuth />,
        children: [
          { path: 'search', element: <Search /> },
          { path: 'charts', element: <Charts /> },
          { path: 'location', element: <CurrentLocation /> },
          { path: 'fivedays', element: <FiveDays /> },
          { path: 'tomorrow', element: <Tomorrow /> }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <>
        <Toaster position="top-right" reverseOrder={ false } />
        <RouterProvider router={ router } />
      </>      
    </AuthProvider>
  </React.StrictMode>,
)
