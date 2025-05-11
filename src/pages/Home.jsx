import { useLocation } from 'react-router-dom';
import Charts from './Charts';
import SevenDayForecast from './SevenDayForecast';
import MainNavigation from '../components/UI/MainNavigation';

const Home = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cities = ['Brisbane','Sydney','Melbourne','Hobart','Adelaide','Perth','Darwin'];
  const showCharts = params.get('show') === 'charts';
  const showSevenDayForecast = params.get('show') === 'sevendayforecast';

  return (
    <div className="bg-weather-teal text-stone-200 mx-4 mb-4">
      <h1 className="text-2xl">Australia</h1>
      <hr className="w-20"/>
      <div>
        <ul>
          <li><h2 className="my-2">Brisbane</h2></li>
          <li><h2 className="my-2">Sydney</h2></li>
          <li><h2 className="my-2">Melbourne</h2></li>
          <li><h2 className="my-2">Hobart</h2></li>
          <li><h2 className="my-2">Adelaide</h2></li>
          <li><h2 className="my-2">Perth</h2></li>
          <li><h2 className="my-2">Darwin</h2></li>
        </ul>
      </div>
      {showCharts && (
        <div className="mt-4">
          <Charts />
        </div>
      )}
      {showSevenDayForecast && (
        <div className="mt-4">
          <SevenDayForecast />
        </div>
      )}

    </div>
  )
}

export default Home;