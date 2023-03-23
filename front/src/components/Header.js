import { Navbar, Nav } from 'react-bootstrap';
import PAGES from '../pages.const';

const Header = (props) => {

    const {
        showMenu,
        setShowMenu,
        currentUser,
        setPage
    } = props;

    return (
        <Navbar className='px-5 bg-info'>
            <Navbar.Brand onClick={ () => setPage(PAGES.map) }>
                Hello over the World
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {currentUser ?
                        <>
                            <Nav.Link
                                onClick={() => setPage(PAGES.account)}
                            >
                                Account ({currentUser.username})
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => {
                                    props.setCurrentUser(null)
                                    sessionStorage.clear();
                                    localStorage.clear();
                                }}>Logout</Nav.Link>
                        </>
                        :
                        <Nav.Link onClick={() => setShowMenu(!showMenu)}>Sign In</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;