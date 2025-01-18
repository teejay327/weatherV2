import { Link } from 'react-router-dom';

const MainNavigation = () => {

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;