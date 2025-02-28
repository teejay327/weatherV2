import { Link } from "react-router-dom";
import MainNavigation from "../MainNavigation.jsx";

import sunImg from "../../../assets/images/sunny.png";

const Header = () => {

  return (
    <header className="flex items-center justify-between bg-weather-teal px-4 py-2 w-full">
      <div className="flex items-center">
      
      <button className="w-12 h-12 bg-transparent border-none flex flex-col justify-around ml-2 mr-4 py-1 cursor-pointer">
        <span className="block w-8 h-1 bg-white"/>
        <span className="block w-8 h-1 bg-white"/>
        <span className="block w-8 h-1 bg-white"/>
      </button>
      <img src={ sunImg } alt="Sunny weather" className="w-28 h-28 mr-4" />
      {/* <div className="text-5xl font-bold"> */}
          <h1 className="bg-weather-teal text-teal-500 text-3xl md:text-5xl"><span className="text-amber-400">Weather</span>Link</h1>
      </div>
      <MainNavigation />
    </header>
  )
}

export default Header;