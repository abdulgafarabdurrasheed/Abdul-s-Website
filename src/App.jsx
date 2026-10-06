import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <VideoBackground currentPage={location.pathname} />
      <Navbar />
      
      <div className="content">
        <h1>Welcome to My Site</h1>
        <p>This is a simple React application with a vertical navbar.</p>
      </div>
    </div>
  )
}

export default App;