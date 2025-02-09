
import sunImg from "../../../assets/images/sunny.png";

const Header = () => {

  return (
    <div>
      <button>
        <span />
        <span />
        <span />
      </button>
      <img src={ sunImg } alt="Sunny weather" />
      <div>
        <h1 className="bg-weather-teal text-teal-500"><span className="text-amber-400">Weather</span>Link</h1>
      </div>
    </div>
  )
}

export default Header;