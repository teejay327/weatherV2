import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  return (
    <header>
      <nav>
        <ul>
          <li className="text-blue-500 hover:text-yellow-100"><NavLink to="/">Home</NavLink></li>
          <li className="text-blue-500 hover:text-yellow-100 active:text-red-400"><NavLink to="/search">Search</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;