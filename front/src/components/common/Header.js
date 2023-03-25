import './Header.css'
import './Common.css'
import { Navbar, Nav } from 'react-bootstrap';
import PAGES from '../../pages.const.js';

const Header = (props) => {

    const {
        showMenu,
        setShowMenu,
        currentUser,
        setPage
    } = props;

    return (
        <Navbar className='px-5 justify-content-between bg-dark '>
            <Navbar.Collapse className='justify-content-start' onClick={() => setPage(PAGES.map)}>
                <h2 className='smoke'>Hello over the World</h2>
            </Navbar.Collapse>

            <Navbar.Collapse className='justify-content-start mr-5'>
                <Nav.Item className='mx-5'>
                    <Nav.Link
                        onClick={() => setPage(PAGES.articles)}
                    > <h4 className='smoke'>Articles</h4> </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-5'>
                    <Nav.Link
                    onClick={() => setPage(PAGES.quizzes)} 
                    ><h4 className='smoke'>Quizzes</h4></Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>

            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    {currentUser ?
                        <>
                            <Nav.Link className='smoke'
                                onClick={() => setPage(PAGES.account)}
                            >
                                <p className='smoke'>Account ({currentUser.username})</p>
                            </Nav.Link>
                            <Nav.Link className='smoke'
                                onClick={() => {
                                    props.setCurrentUser(null)
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    setPage(PAGES.map);
                                }}>Logout</Nav.Link>
                        </>
                        :
                        <Nav.Link
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <h4 className='smoke'>Sign In</h4>
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;