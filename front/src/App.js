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
import Article from './components/articles/Article.js';
import ArticleForm from './components/articles/ArticleForm.js';

function App() {

  const [currentPage, setPage] = useState(PAGES.map);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [newMarkerInfo, setNewMarkerInfo] = useState(null);
  const [needHint, setNeedHint] = useState(false);

  const renderComponent = () => {
    switch(currentPage) {
      case PAGES.map: 
        return <GLMap id='Map' currentUser={currentUser} setNewMarkerInfo={setNewMarkerInfo} setPage={setPage} needHint={needHint}/>
      case PAGES.account:
        return <Account/>
      case PAGES.articles:
        return <Articles currentUser={currentUser} setCurrentArticle={setCurrentArticle} setPage={setPage} setNeedHint={setNeedHint}/>
      case PAGES.article:
        return <Article currentArticle={currentArticle} currentUser={currentUser} setCurrentUser={setCurrentUser} setPage={setPage}/>
      case PAGES.new_article:
        return <ArticleForm currentUser={currentUser} setPage={setPage} newMarkerInfo={newMarkerInfo}/>
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
