import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/UI/MainNavigation';

const RootLayout = () => {

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout;