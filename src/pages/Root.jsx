import { AuthProvider } from "../components/shared/context/auth-context.jsx";
import App2 from "../App2.jsx";
// import MainNavigation from '../components/UI/MainNavigation';

const RootLayout = () => {

  return (
    <div>
      <AuthProvider>
        <App2 />
      </AuthProvider>
      
      {/* <MainNavigation /> */}
      {/* <main className="flex-1 p-4">
        <Outlet />
      </main> */}
     </div>
  )
}

export default RootLayout;