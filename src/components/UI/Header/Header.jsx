// import MainNavigation from "../MainNavigation.jsx";
import sunImg from "../../../assets/images/sunny.png";


const Header = () => {

  return (
    <div className="flex bg-weather-teal">
      <button>
        <span />
        <span />
        <span />
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