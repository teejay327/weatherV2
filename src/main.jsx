import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Search from './pages/Search.jsx';
import Charts from './pages/Charts.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'search', element: <Search /> },
      { path: 'charts', element: <Charts /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>,
)
