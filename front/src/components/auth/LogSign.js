import './LogSign.style.css';
import Login from './Login.js';
import Register from './Register';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';

const LogSign = (props) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            id='auth-menu'
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            indicators={false}
            variant='dark'
            >
            <Carousel.Item>
                <Login setShowMenu={props.setShowMenu} setCurrentUser={props.setCurrentUser} />
            </Carousel.Item>
            <Carousel.Item>
                <Register setIndex={setIndex}/>
            </Carousel.Item>
        </Carousel>
    )
};

export default LogSign;