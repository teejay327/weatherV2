import NavBar from "./components/UI/NavBar.jsx";
import Sidebar from "./components/UI/Sidebar.jsx";


const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
    
      <div className="flex">
        <Sidebar className="justify-start"/>
        <h1 className="h-screen w-screen text-center text-5xl font-bold bg-weather-teal text-teal-500"><span className="text-amber-400">Weather</span>Link</h1>

      </div>
    </div>
  );
}

export default App;