import { NavLink } from 'react-router-dom';

const MainNavigation = () => {

  return (
    <nav className="flex">

        <ul className="flex space-x-6">
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink to="/" className={({isActive}) => isActive ? "text-yellow-400 hover:bg-slate-700" : undefined} end>
              Home
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink to="/search" className={({isActive}) => isActive ? "text-yellow-400 hover:bg-slate-700" : undefined}>
              Search
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink to="/login" className={({isActive}) => isActive ? "text-yellow-400 hover:bg-slate-700" : undefined}>
              Login
            </NavLink>
          </li>
        </ul>

    </nav>
  )
}

export default MainNavigation;