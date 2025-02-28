import Header from './components/UI/Navigation/Header.jsx';
import Sidebar from './components/UI/Sidebar.jsx';

const App2 = () => {
  return (
    <div className="h-screen bg-weather-teal">
      <Header />
      <div className="flex my-2">
        <Sidebar className="justify-start" />
        <div className="flex-1">
          {/* Content will be handled by the router in main.jsx */}
        </div>
      </div>
    </div>
  );
};

export default App2;