import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = (props) => {

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        console.log('Register submitted');
        const elements = e.target.elements;
        const getValue = key => elements[key].value;
        const username = getValue('username');
        const email = getValue('email');
        const password = getValue('password');
        const user_data = { username, email, password };
        try {
            const response = await axios.post('http://localhost:3003/api/users/register', user_data);
            setSuccessMessage(response.data.msg);
            setTimeout(props.setIndex(1), 1000)
        } catch (error) {
            setErrorMessage(error.response.data.msg);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label className="pt-4">Register</Form.Label>

            <Form.Group className="mb-3 mx-5 px-4" controlId="formBasicEmail">
                <Form.Control className="mt-3" name="username" type="text" placeholder="Enter your username" />
            </Form.Group>

            <Form.Group className="mb-3 mx-5 px-4" controlId="formBasicEmail">
                <Form.Control className="mt-3" name="email" type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3 mx-5 px-4" controlId="formBasicPassword">
                <Form.Control type="password" name="password" placeholder="Enter your password" />
            </Form.Group>
            {successMessage
                ?
                <div>{successMessage}</div>
                :
                <div>{errorMessage}</div>
            }
            <Button className='mt-3 px-5' variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
    )
};

export default Register;