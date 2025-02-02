import { NavLink } from 'react-router-dom';

const MainNavigation = () => {

  return (
    <header>
      <nav>
        <ul>
          <li className="text-blue-500 hover:text-yellow-500">
            <NavLink to="/" className={({isActive}) => isActive ? "text-slate-400 hover:bg-slate-700" : undefined} end>
              Home
            </NavLink>
          </li>
          <li className=" text-blue-500 hover:text-yellow-500">
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