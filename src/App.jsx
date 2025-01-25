import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

// import NavBar from "./components/UI/NavBar.jsx";
import Sidebar from "./components/UI/Sidebar.jsx";
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import RootLayout from './pages/Root.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  { path: '/', 
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home />},
      { path: '/search', element: <Search /> }
    ]
  },
]);

const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <RouterProvider router={router} />
      <div className="flex">
        <Sidebar className="justify-start"/>
        <h1 className="h-screen w-screen text-center text-5xl font-bold bg-weather-teal text-teal-500"><span className="text-amber-400">Weather</span>Link</h1>

      </div>
    </div>
  );
}

export default App;