// Styles
import '../src/App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Third parties
import { useState } from 'react';
import PAGES from './pages.const.js';

// My components
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';
import GLMap from './components/map/Map.js';
import LogSign from './components/auth/LogSign.js'
import Account from './components/account/Account.js';
import Articles from './components/articles/Articles.js';

function App() {

  const [currentPage, setPage] = useState(PAGES.map);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const renderComponent = () => {
    switch(currentPage) {
      case PAGES.map: 
        return <GLMap id='Map' />
      case PAGES.account:
        return <Account currentUser={currentUser}/>
      case PAGES.articles:
        return <Articles/>
      default:
        return ''
    }
  }

  return (
    <div className="App">
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
      
      {renderComponent()}

      {showMenu && <LogSign setCurrentUser={setCurrentUser} setShowMenu={setShowMenu} />}
      
      <Footer />
    </div>
  );
}

export default App;
