import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const MainNavigation = ({ isMobile = false, closeMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeLink = params.get("show");
  // const showCharts = params.get('show') === 'charts';
  // const showSevenDays = params.get('show') === 'sevendayforecast';

  const handleClick = (event) => {
    // if (isMobile && closeMenu) {
    //   setTimeout(() => closeMenu(), 150);
    // }
    if (event.target.innerText.toLowerCase() === "home") {
      navigate("/");
    }
  }

  return (
    <nav >
        <ul className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-6"}`} >
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive && !activeLink ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"                
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
              to="/?show=charts"
              // className={({isActive}) =>
              //   showCharts && isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              // } onClick={handleClick}
              className={() =>
                activeLink === "charts" ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
              }
            >
              Charts
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink
              to="/?show=sevendayforecast"
              // className={({isActive}) =>
              //   showSevenDays && isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
              // } onClick={handleClick}
              className={() =>
                activeLink === "sevendayforecast" ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
              }
            >
              7 Days
            </NavLink>
          </li>
          <li className="bg-stone-900 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/login" 
              className={({isActive}) => 
                isActive ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
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