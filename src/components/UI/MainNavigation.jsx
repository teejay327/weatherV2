import { NavLink } from 'react-router-dom';

const MainNavigation = ({ isMobile = false, closeMenu }) => {
  const handleClick = () => {
    if (isMobile && closeMenu) {
      setTimeout(() => closeMenu(), 150);
    }
  }

  return (
    <nav >
        <ul className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-6"}`} >
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              } 
              end 
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/search" 
              className={({isActive}) => 
                isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              } onClick={handleClick}
            >
              Search
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink
              to="/charts"
              className={({isActive}) =>
                isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              } onCLick={handleClick}
            >
              Charts
            </NavLink>
          </li>

          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/login" 
              className={({isActive}) => 
                isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              } onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
        </ul>

    </nav>
  )
}

export default MainNavigation;