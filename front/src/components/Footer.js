import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <>
            <Navbar className='px-5 bg-primary' fixed='bottom'>
                <Navbar.Brand className='center'>
                    Made by Vitalii Kuznetcov as DI Final Project, 2023
                </Navbar.Brand>
            </Navbar>
        </>
    )
};

export default Footer;