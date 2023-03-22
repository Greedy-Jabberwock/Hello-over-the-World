// Styles
import '../src/App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Third parties


// My components
import Header from './components/Header.js';
import Map from './components/Map.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
        <Header/>
        <Map id='Map'/>
        <Footer/>
    </div>
  );
}

export default App;
