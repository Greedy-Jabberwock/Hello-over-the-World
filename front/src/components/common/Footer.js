import Navbar from 'react-bootstrap/Navbar';
import './Common.css'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <Navbar className='px-5 bg-common foot' fixed='bottom'>
                <Navbar.Brand className='center text-light'>
                    Made by Vitalii Kuznetcov as DI Final Project, 2023
                </Navbar.Brand>
            </Navbar>
        </>
    )
};

export default Footer;