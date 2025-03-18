import { Link } from 'react-router-dom';
import MainNavigation from '../components/UI/MainNavigation';

const Home = () => {

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

    </div>

  )
}

export default Home;