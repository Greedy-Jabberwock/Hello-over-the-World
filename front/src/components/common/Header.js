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
        <Navbar className='px-5 bg-info justify-content-between'>
            <Navbar.Collapse className='justify-content-start' onClick={() => setPage(PAGES.map)}>
                <h2>Hello over the World</h2>
            </Navbar.Collapse>

            <Navbar.Collapse className='justify-content-start mr-5'>
                <Nav.Item className='mx-5'>
                    <Nav.Link
                        onClick={() => setPage(PAGES.articles)}
                    > <h4>Articles</h4> </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-5'>
                    <Nav.Link
                    // onClick={() => setPage(PAGES.quizzes)} 
                    ><h4>Quizzes</h4></Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>

            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
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
                        <Nav.Link
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <h4>Sign In</h4>
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;