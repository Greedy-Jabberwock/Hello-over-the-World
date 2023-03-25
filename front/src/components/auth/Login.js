import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Login = (props) => {

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        try {
            const response = await axios.post('http://localhost:3003/api/users/login',
                {
                    value: username,
                    password
                });
            const token = response.data.token;
            sessionStorage.setItem('AccessToken', token);
            props.setCurrentUser(jwt_decode(token));
            props.setShowMenu(false);
        } catch (error) {
            console.log(error.response.data.msg);
            setErrorMessage(error.response.data.msg);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label className="pt-4 mb-4">Login</Form.Label>

            <Form.Group className="mb-4 mx-5 px-4" controlId="formBasicEmail">
                <Form.Control name="username" type="text" placeholder="Enter your email or username" />
            </Form.Group>

            <Form.Group className="mb-4 mx-5 px-4" controlId="formBasicPassword">
                <Form.Control type="password" name="password" placeholder="Enter your password" />
            </Form.Group>

            {errorMessage && <div>{errorMessage}</div>}
            
            <Button className="mt-4 px-5" variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login;