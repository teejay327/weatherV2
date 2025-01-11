import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  return (
    <main>
      <h1 className="h-screen text-center text-5xl font-bold  bg-weather-teal text-teal-500"><span className="text-amber-400">Weather</span>Link</h1>
      <Sidebar className=""/>
      <p>Hi Tony</p>
    </main>
  );
}

export default App;