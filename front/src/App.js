// Styles
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Third parties


// My components
import Header from './components/Header.js';
// import Footer from './components/Footer.js';
import Map from './components/Map.js';

function App() {
  return (
    <div className="App">
        <Header/>
        <Map/>
        {/* <Footer/> */}
    </div>
  );
}

export default App;
