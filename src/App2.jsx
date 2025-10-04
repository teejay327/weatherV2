import Header from './components/UI/Navigation/Header.jsx';
import Sidebar from './components/UI/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './components/shared/context/auth-context.jsx';
import Footer from "./components/shared/layout/Footer.jsx";

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
        <div className="flex flex-col min-h-screen bg-weather-teal">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="w-64 bg-gray-800 text-stone-200 min-h-full" />
            <div className="flex-1 px-3 overflow-auto">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
    </AuthProvider>
  );
};

export default App2;