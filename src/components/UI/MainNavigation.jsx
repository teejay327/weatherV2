import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/use-auth.jsx';
import toast from 'react-hot-toast';

const MainNavigation = ({ isMobile = false, closeMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeLink = params.get("show");
  const place = params.get("place") || localStorage.getItem("lastPlace");
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;

  const handleClick = (event) => {
    if (typeof closeMenu === "function") closeMenu();
  }

  const baseLink = "bg-stone-800 text-slate-200 rounded-md px-4 py-2 min-h-[44px] inline-flex items-center hover:bg-slate-700 hover:text-yellow-700"
  const activeLinkClass = "text-yellow-400";
  const navClass = ({ isActive }) => baseLink + (isActive ? activeLinkClass : "");
  // For "virtual" tabs that are controlled by ?show=...
  const navClassByShow = (showValue) => baseLink + (activeLink === showValue ? activeLinkClass : "");

  return (
    <nav >
      <ul className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-6"}`} >
        <li>
          <NavLink 
            to="/" 
            className={navClass}
            end 
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink 
                to="/search" 
                className={navClass} 
                onClick={handleClick}
              >
                Search
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/location?place=${place}&show=charts`}
                className={() => navClassByShow("charts")}
                onClick={handleClick}
              >
                Charts
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/location?place=${place}&show=fivedays`}
                className={() => navClassByShow("fivedays")}
                onClick={handleClick}
              >
                5 Days
              </NavLink>
            </li>
            <li>
              <NavLink
                to={place ? `/tomorrow?place=${encodeURIComponent(place)}` : "/search"}
                className={navClass}
                onClick={handleClick}
              >
                Tomorrow
              </NavLink>
            </li>
          </>
        )}

        {!isLoggedIn && (  
          <li>
            <NavLink 
              to="/login" 
              className={navClass} 
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <button
              onClick={() => {
                logout();
                toast("You've been logged out!");
                navigate('/');
                handleNav();
              }}
              className={baseLink + " justify-center hover:text-yellow-400"}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default MainNavigation;