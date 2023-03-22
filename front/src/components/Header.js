import { Navbar, Button, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar className='px-5 bg-info'>
            <Navbar.Brand href="#home">Hello over the World</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {/* <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text> */}
                <Nav>
                    <Nav.Link href="#login">Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;