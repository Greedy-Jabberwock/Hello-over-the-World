// Styles
import '../src/App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Third parties
import { useState } from 'react';

// My components
import Header from './components/Header.js';
import GLMap from './components/Map.js';
import Footer from './components/Footer.js';
import LogSign from './components/auth/LogSign.js'

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
        <Header showMenu={showMenu} setShowMenu={setShowMenu} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <GLMap id='Map'/>
        {showMenu && <LogSign setCurrentUser={setCurrentUser} setShowMenu={setShowMenu}/>}
        <Footer/>
    </div>
  );
}

export default App;
