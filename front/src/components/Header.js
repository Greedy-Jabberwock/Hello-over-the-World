import { Navbar, Nav } from 'react-bootstrap';
// import { useState } from 'react';

const Header = (props) => {

    const {
        showMenu,
        setShowMenu,
        currentUser
    } = props;

    return (
        <Navbar className='px-5 bg-info'>
            <Navbar.Brand href="#home">Hello over the World</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {currentUser ?
                        <>
                            <Nav.Link href="#account">Account ({currentUser.username})</Nav.Link>
                            <Nav.Link onClick={() => {
                                props.setCurrentUser(null)
                                sessionStorage.clear();
                                localStorage.clear();
                                }}>Logout</Nav.Link>
                        </>
                        :
                        <Nav.Link href="#login" onClick={() => setShowMenu(!showMenu)}>Login</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;