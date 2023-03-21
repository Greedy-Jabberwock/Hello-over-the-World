import { Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar className='px-5 bg-info' fixed='top'>
            <Navbar.Brand href="#home">Hello over the World</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;