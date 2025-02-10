import { NavLink } from 'react-router-dom';

const MainNavigation = () => {

  return (
    <header className="flex bg-weather-teal">
      <nav >
        <ul>
          <li className="bg-stone-900 text-slate-200 hover:text-yellow-500">
            <NavLink to="/" className={({isActive}) => isActive ? "text-slate-400 hover:bg-slate-700" : undefined} end>
              Home
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 hover:text-yellow-500">
            <NavLink to="/search" className={({isActive}) => isActive ? "text-slate-400 hover:bg-slate-700" : undefined}>
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;