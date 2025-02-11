// import MainNavigation from "../MainNavigation.jsx";
import sunImg from "../../../assets/images/sunny.png";


const Header = () => {

  return (
    <div className="flex bg-weather-teal">
      <button className="w-12 h-12 bg-transparent border-none flex flex-col justify-around ml-2 mr-8 py-1 cursor-pointer">
        <span className="block w-12 h-1 bg-white"/>
        <span className="block w-12 h-1 bg-white"/>
        <span className="block w-12 h-1 bg-white"/>
      </button>
      <img src={ sunImg } alt="Sunny weather" />
      <div className="text-5xl font-bold">
        <h1 className="bg-weather-teal text-teal-500"><span className="text-amber-400">Weather</span>Link</h1>
      </div>
      {/* <MainNavigation /> */}
    </div>
  )
}

export default Header;