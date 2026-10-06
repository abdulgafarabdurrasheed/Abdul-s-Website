import './App.css'
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';

function App() {
  

  return (
    <div className="App">
      <VideoBackground />
      <Navbar />
      <div className="content">
        <h1>Welcome to My Site</h1>
        <p>This is a simple React application with a vertical navbar.</p>
      </div>
    </div>
  )
}

export default App
